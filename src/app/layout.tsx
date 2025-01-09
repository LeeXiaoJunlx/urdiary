import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Keluh Kesah",
  description: "Silahkan berkeluh kesah di sini",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
