"use server"

import { cookies } from "next/headers"
import jwt, { JwtPayload } from "jsonwebtoken"
import { redirect } from "next/navigation"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginState = {
  success: true
  statusCode: number
  message: string
  data: {
    accessToken: string
    refreshToken: string
  }
}

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState,
  formData: FormData
) => {
  const isProduction = process.env.NODE_ENV === "production"

  const email = formData.get("email")
  const password = formData.get("password")

  const payload = { email, password }
  console.log("Payload Received:", payload)

  const validatedFields = loginSchema.safeParse(payload)
  if (!validatedFields.success) {
    return {
      success: false,
      message:
        validatedFields.error.flatten().fieldErrors.email?.[0] ||
        validatedFields.error.flatten().fieldErrors.password?.[0] ||
        "Validation failed",
    }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  })

  const result = await res.json()
  console.log("Backend Result:", result)

  if (result.success) {
    const cookieStore = await cookies()

    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })
    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })

    const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload
    const role = decodedToken.role?.toUpperCase()

    if (
      redirectTo &&
      redirectTo.startsWith("/") &&
      !redirectTo.startsWith("//")
    ) {
      redirect(redirectTo)
    }

    if (role === "CUSTOMER") {
      redirect("/dashboard/customer")
    } else if (role === "ADMIN") {
      redirect("/dashboard/admin")
    } else if (role === "TECHNICIAN") {
      redirect("/dashboard/technician")
    }

    return result
  } else {
    return {
      success: false,
      message: result.message || "Invalid credentials",
    }
  }
}

export const getLoggedInUserAction = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) return null

  try {
    const decoded = jwt.decode(token) as JwtPayload
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    }
  } catch (error) {
    return null
  }
}
