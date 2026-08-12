import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtUtils } from "./app/utils/jwt"
import { getRefreshToken } from "./service/refreshToken"
import { JwtPayload } from "jsonwebtoken"

const AUTH_ROUTES = ["/auth/login", "/auth/register", "/explore"]
const PUBLIC_ROUTES = ["/", "/services", "/about", "/contact"]

export async function proxy(request: NextRequest) {
  const isProduction = process.env.NODE_ENV === "production"

  const pathname = request.nextUrl.pathname

  // if (pathname.startsWith("/api/auth")) {
  //   return NextResponse.next()
  // }
  const response = NextResponse.next()

  const cookieStore = await cookies()

  let accessToken = request.cookies.get("accessToken")?.value
  const refreshToken = request.cookies.get("refreshToken")?.value

  let decodedAccessToken = accessToken
    ? jwtUtils.verifiedToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      )
    : null

  const decodedRefreshToken = refreshToken
    ? jwtUtils.verifiedToken(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      )
    : null

  if (!decodedAccessToken?.success && decodedRefreshToken?.success) {
    const result = await getRefreshToken()

    if (result.success) {
      const newAccessToken = result.data.accessToken

      accessToken = newAccessToken

      response.cookies.set("accessToken", newAccessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      })

      decodedAccessToken = jwtUtils.verifiedToken(
        accessToken!,
        process.env.JWT_ACCESS_SECRET as string
      )

      return response
    }
  }

  let userRole = null

  if (decodedAccessToken?.success && decodedAccessToken.data) {
    userRole = (decodedAccessToken.data as JwtPayload).role
  }

  if (!decodedAccessToken?.success) {
    response.cookies.delete("accessToken")
  }

  if (accessToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "CUSTOMER") {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url))
    } else if (userRole === "TECHNICIAN") {
      return NextResponse.redirect(
        new URL("/dashboard/technician", request.url)
      )
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url))
    } else {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  if (!accessToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/auth/login", request.url)

    loginUrl.searchParams.set("redirectTo", pathname + request.nextUrl.search)

    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith("/dashboard/customer") && userRole !== "CUSTOMER") {
    return NextResponse.redirect(new URL("/not-found", request.url))
  } else if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/not-found", request.url))
  } else if (
    pathname.startsWith("/dashboard/technician") &&
    userRole !== "TECHNICIAN"
  ) {
    return NextResponse.redirect(new URL("/not-found", request.url))
  }

  return response
}

export const config = {
  matcher: [
    // Exclude API routes, static files, image optimizations, and .png files
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
}
