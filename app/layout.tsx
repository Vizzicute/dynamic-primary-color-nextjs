import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeColorProvider } from "@/context/theme-color-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dynamic Theme Color",
  description: "Dynamic primary color system with light/dark mode",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeColorProvider>{children}</ThemeColorProvider>
        </ThemeProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                    const color = localStorage.getItem("userPrimaryColor");
                    if (color) document.documentElement.style.setProperty("--primary", color);
                    `,
          }}
        />
      </body>
    </html>
  );
}
