import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/app/providers";
import PageTransition from "@/components/animations/PageTransition";
import ClientWidgets from "@/components/layout/ClientWidgets";
import Footer from "@/components/ui/Footer";
import Header from "@/components/ui/Header";
import ScrollToTop from "@/components/ui/ScrollToTop";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  title: {
    default: "CineFilly",
    template: "%s | CineFilly",
  },
  description: "Discover movies, TV shows, music trailers, top-rated films, and cast profiles.",
  openGraph: {
    type: "website",
    siteName: "CineFilly",
    title: "CineFilly",
    description: "Discover movies, TV shows, music trailers, top-rated films, and cast profiles.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CineFilly",
    description: "Discover movies, TV shows, music trailers, top-rated films, and cast profiles.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      <body className={`${poppins.variable} flex min-h-screen flex-col bg-gray-900 font-sans text-white antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-red-600 focus:px-4 focus:py-2"
        >
          Skip to main content
        </a>
        <Providers>
          <ScrollToTop />
          <Header />
          <main id="main-content" className="flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ClientWidgets />
        </Providers>
      </body>
    </html>
  );
}
