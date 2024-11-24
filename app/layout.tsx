// app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Better Dining Hall",
  description: "A modern interface for checking dining hall menus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${raleway.className} antialiased bg-background-dark text-text-dark`}
      >
        {children}
      </body>
    </html>
  );
}
