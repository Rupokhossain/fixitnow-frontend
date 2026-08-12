export const dynamic = "force-dynamic"

import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { StoreProvider } from "./providers/StoreProvider"
import { getLoggedInUserAction } from "./(authLayout)/auth/_actions/authActions"
import { cookies } from "next/headers"
import { ThemeProvider } from "./providers/ThemeProvider"
import { NextAuthProvider } from "./providers/NextAuthProvider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value || null
  const user = await getLoggedInUserAction()

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-screen bg-background">
        <StoreProvider initialUser={user} initialToken={token}>
          <NextAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster position="top-center" richColors />
            </ThemeProvider>
          </NextAuthProvider>
        </StoreProvider>
      </body>
    </html>
  )
}
