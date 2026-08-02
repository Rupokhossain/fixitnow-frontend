import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { StoreProvider } from "./providers/StoreProvider"
import { getLoggedInUserAction } from "./(authLayout)/auth/_actions/authActions"
import { cookies } from "next/headers"

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
      <body>
        <div>
          <StoreProvider initialUser={user} initialToken={token}>
            {children}
            <Toaster position="top-center" richColors />
          </StoreProvider>
        </div>
      </body>
    </html>
  )
}
