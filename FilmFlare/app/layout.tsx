import type { Metadata, Viewport } from "next";
import Providers from "@/app/providers";
import ClientWidgets from "@/components/layout/ClientWidgets";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "FilmFlare",
    template: "%s | FilmFlare",
  },
  description: "Discover movies and music",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-900 text-white antialiased">
        <Providers>
          <ScrollToTop />
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ClientWidgets />
        </Providers>
      </body>
    </html>
  );
}
