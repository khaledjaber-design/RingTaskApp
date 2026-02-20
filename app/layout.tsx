import React from "react"
import type { Metadata, Viewport } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RingTask - AI-Powered Task Assistant",
  description:
    "Your AI-Powered Task Assistant. Manage tasks with voice commands and smart scheduling.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#14B8A6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} antialiased flex items-center justify-center min-h-screen bg-[#E5E7EB]`}
      >
        <div className="w-[375px] h-[812px] relative overflow-hidden rounded-[40px] shadow-2xl border-[8px] border-[#1F2937] bg-background">
          {children}
        </div>
      </body>
    </html>
  )
}
