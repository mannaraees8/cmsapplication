'use client'
import { RecoilRoot } from "recoil"
import "./globals.css"
import { Raleway } from "next/font/google"

export const metadata = {
  title: "Raees Ahmed",
  description: "Manna Raees Ahmed's Portfolio",
  viewport:
    "user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=device-dpi"
}
const raleway = Raleway({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" scroll-smooth">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={` text-slate-100 scroll-smooth ${raleway.className}`}>
        <RecoilRoot>
        {children}
        </RecoilRoot>
      </body>
    </html>
  )
}
