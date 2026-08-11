import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Tracking Application",
  description: "Job Tracking Application by KG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <QueryProvider>
          <ThemeProvider
          // attribute="class"
          // defaultTheme="system"
          // enableSystem
          // disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
        <Toaster
          richColors
          position="top-center"
          toastOptions={{
            duration: 3000,
            className: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
          }} />
      </body>
    </html>
  );
}
