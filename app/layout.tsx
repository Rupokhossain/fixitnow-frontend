import { Geist, Geist_Mono, Inter } from "next/font/google"

import "./globals.css"

import { cn } from "@/lib/utils"
import { Toaster } from "sonner"
import { StoreProvider } from "./providers/StoreProvider"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
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
          <StoreProvider>
            {children}
            <Toaster position="top-center" richColors />
          </StoreProvider>
        </div>
      </body>
    </html>
  )
}
