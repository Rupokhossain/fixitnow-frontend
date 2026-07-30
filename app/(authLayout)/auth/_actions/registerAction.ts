"use server"

import { redirect } from "next/navigation"
import z from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["CUSTOMER", "TECHNICIAN", "ADMIN"]),
})

export type RegistrationState = {
  success: boolean
  statusCode?: number
  message: string
  data?: {
    user: {
      id: string
      name: string
      email: string
      role: string
      status: string
      createdAt?: string
      updatedAt?: string
    }
  }
}

export const registerAction = async (
  prevState: RegistrationState,
  formData: FormData
): Promise<RegistrationState> => {
  try {
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      role: (formData.get("role") as string).toUpperCase(),
    }

    const redirectTo = (formData.get("redirectTo") as string) || "/auth/login"

    // Zod Validation
    const validatedFields = registerSchema.safeParse(payload)

    if (!validatedFields.success) {
      return {
        success: false,
        message: validatedFields.error.issues[0]?.message || "Invalid input.",
      }
    }

    const apiUrl = process.env.BACKEND_API_URL

    if (!apiUrl) {
      return {
        success: false,
        message: "BACKEND_API_URL is not configured.",
      }
    }

    console.log("Using API:", apiUrl)

    const res = await fetch(`${apiUrl}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
      cache: "no-store",
    })

    const result = await res.json()

    // console.log("Backend Response:", result)

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Registration failed.",
      }
    }

    if (result.success) {
      redirect(redirectTo || "/auth/login")
    }

    return {
      success: false,
      message: result.message || "Registration failed.",
    }
  } catch (error) {
    // console.error("Register Action Error:", error)

    throw error
  }
}
