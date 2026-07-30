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
      headers: {
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-cache",
    }
  );

  const result = await res.json();

  return result;

}
