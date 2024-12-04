import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Better Dining Hall",
  description: "A modern interface for checking CSULB dining hall menus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Hand:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${montserrat.className} bg-background-dark text-text-dark antialiased`}
      >
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
