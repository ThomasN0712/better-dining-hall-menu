import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"], // Specify weights to reduce payload
  display: "swap", // Ensures fallback font is swapped smoothly
});

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
        className={`${montserrat.className} antialiased bg-background-dark text-text-dark`}
      >
        {children}
      </body>
    </html>
  );
}
