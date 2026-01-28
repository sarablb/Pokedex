import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "@/lib/providers";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pokedex",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}