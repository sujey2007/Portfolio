import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Sujey H — Creative Developer",
  description: "Portfolio of Sujey H — Creative Developer with a cinematic, futuristic design language.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Druk Wide Super / Heavy — via cdnfonts (commercial typeface, ensure license for production) */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.cdnfonts.com/css/druk-wide-bold" rel="stylesheet" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bodoni+Moda:opsz,wght@6..96,700;6..96,800;6..96,900&family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#050508] text-[#f5f1e8] overflow-x-hidden">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
