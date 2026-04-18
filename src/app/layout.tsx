import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-heading" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Roop Stone Arts - Where Stones Become Poetry",
  description: "A premium marble brand rooted in over three decades of craftsmanship, originating from the historic marble town of Makrana, Rajasthan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${notoSerif.variable} ${manrope.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
