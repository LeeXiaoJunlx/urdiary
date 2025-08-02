import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: "Your Diary",
  description: "Your Diary adalah adalah tempat bagi siapa saja untuk mencurahkan isi hati dan berbagi pengalaman. Platform ini dibuat dengan tujuan untuk mengurangi angka stress di Indonesia.",
  keywords: "keluh kesah, curhat, stress, menfess, fess, indonesia, keluhan, pengalaman, curhatan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.className} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
            >
        {children}
        <Toaster />
        </ThemeProvider>
      </body>
      <Script
      async
      src="https://aldomi-c4d89e77fabd.herokuapp.com/script.js" 
      data-website-id="bb1e9d82-e1fe-45d8-9a00-9a2a0dba1c67"/>
    </html>
  );
}
