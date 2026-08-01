import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { StoreProvider } from "./providers/StoreProvider"
import { getLoggedInUserAction } from "./(authLayout)/auth/_actions/authActions"

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

  const user = await getLoggedInUserAction();
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
          <StoreProvider initialUser={user}>
            {children}
            <Toaster position="top-center" richColors />
          </StoreProvider>
        </div>
      </body>
    </html>
  )
}
