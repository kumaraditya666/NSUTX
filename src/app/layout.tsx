import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/site-footer";
import { SearchOverlay } from "@/components/search-overlay";
import { SwRegister } from "@/components/sw-register";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | NSUT Hub",
    default: "NSUT Hub — Everything happening at NSUT. One place.",
  },
  description:
    "Discover societies, events, opportunities and everything happening around NSUT Delhi.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "NSUT Hub" },
};

export const viewport: Viewport = {
  themeColor: "#0b0b12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="flex-1 pb-20 md:pb-0">
            {children}
          </main>
          <SiteFooter />
          <MobileNav />
          <SearchOverlay />
          <SwRegister />
        </Providers>
      </body>
    </html>
  );
}
