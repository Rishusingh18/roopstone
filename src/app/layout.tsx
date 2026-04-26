import type { Metadata } from "next";
import { Cinzel, Jost } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/ui/FloatingWhatsApp";

const cinzel = Cinzel({ 
  subsets: ["latin"], 
  weight: ["400", "700"], 
  variable: "--font-cinzel" 
});

const jost = Jost({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost" 
});

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
    <html lang="en" className={`${cinzel.variable} ${jost.variable}`}>
      <body style={{ fontFamily: 'var(--font-jost), sans-serif' }}>
        <Navbar />
        {children}
        <FloatingWhatsApp />
        <Footer />
      </body>
    </html>
  );
}
