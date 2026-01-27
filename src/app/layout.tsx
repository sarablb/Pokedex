import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400","500","600","700"],
});

export const metadata: Metadata = {
  title: "Pokedex",
  description: "A fast static Pokedex website with React + Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        {children}
      </body>
    </html>
  );
}
