"use server"

import { cookies } from "next/headers"

export const getRefreshToken = async () => {
  const cookisStore = await cookies()

  const refreshToken = cookisStore.get("refreshToken")?.value

  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh Token not found!",
    }
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/auth/refresh-token`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    }
  )

  const result = await res.json()

  if (result.success) {
    const cookieStore = await cookies()

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24,
    })
  }

  return result
}
