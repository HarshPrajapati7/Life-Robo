import type { Metadata } from "next";
import { Orbitron, Rajdhani, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIFE ROBO",
  description: "Learn and Innovation in the Field of Engineering - Robotics Club",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  }
};

import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import Preloader from "@/components/layout/Preloader";
import MainContentWrapper from "@/components/layout/MainContentWrapper";
import BackgroundEffects from "@/components/layout/BackgroundEffects";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${rajdhani.variable} ${shareTechMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-black`}
      >
        <Preloader />
        <BackgroundEffects />
        <NavbarWrapper />
        <MainContentWrapper>
          {children}
        </MainContentWrapper>
        <FooterWrapper />
      </body>
    </html>
  );
}
