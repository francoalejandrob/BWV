import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const siteUrl = "https://bornwithvision.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "BWV™ — Born With Vision | Made for you, not for everyone",
  description:
    "Ropa personalizada con diseños propios. Originals y Rebels: back-prints exclusivos, oversize fit, hechos en Salinas, Ecuador. $25 + envío.",
  openGraph: {
    title: "BWV™ — Born With Vision",
    description:
      "Originals y Rebels. Diseños propios, oversize fit. Made for you, not for everyone.",
    url: siteUrl,
    siteName: "BWV™",
    images: ["/brand/banner.png"],
    locale: "es_EC",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
