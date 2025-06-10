import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Alif Al Razi – Portfolio",
  icons: {
    icon: "/images/letter-a.png",
  },
  description: "Software Engineer | React Full Stack Developer | AI Enthusiast",
  keywords: ["software engineer", "full stack developer", "react developer", "AI enthusiast", "web development", "portfolio"],
  authors: [{ name: "Alif Al Razi" }],
  openGraph: {
    title: "Alif Al Razi – Portfolio",
    description: "Software Engineer | React Full Stack Developer | AI Enthusiast",
    url: "https://alifalrazi.com",
    siteName: "Alif Al Razi Portfolio",
    images: [
      {
        url: "/images/alif.png",
        width: 1200,
        height: 630,
        alt: "Alif Al Razi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alif Al Razi – Portfolio",
    description: "Software Engineer | React Full Stack Developer | AI Enthusiast",
    images: ["/images/alif.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <Providers>
          <Navbar />
          <main className="flex-grow pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
