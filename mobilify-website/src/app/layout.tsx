import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "../analytics/GoogleAnalytics";
import CrispChat from "../analytics/CrispChat";
import OrganizationSchema from "../components/OrganizationSchema";
import StructuredData from "../components/StructuredData";
import WebVitals from "../analytics/WebVitals";
import { ThemeProvider } from "../contexts/ThemeContext";
import NoSSR from "../components/NoSSR";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap', // Improve font loading performance
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Mobilify | Turn Your Website or Idea Into a Custom Mobile App",
    template: "%s | Mobilify - Custom Mobile App Development"
  },
  description: "Mobilify converts your existing website or new idea into a high-quality, native mobile app for iOS and Android. Get a beautiful, custom-designed app without the complexity. See our demo!",
  keywords: [
    "mobile app development",
    "website to app conversion",
    "custom mobile apps",
    "iOS app development",
    "Android app development",
    "mobile app builder",
    "app development services",
    "native mobile apps",
    "mobile app design",
    "app development company"
  ],
  authors: [{ name: "Mobilify Team" }],
  creator: "Mobilify",
  publisher: "Mobilify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://mobilify.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mobilify | Turn Your Website or Idea Into a Custom Mobile App",
    description: "Mobilify converts your existing website or new idea into a high-quality, native mobile app for iOS and Android. Get a beautiful, custom-designed app without the complexity.",
    url: '/',
    siteName: 'Mobilify',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mobilify - Custom Mobile App Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mobilify | Turn Your Website or Idea Into a Custom Mobile App",
    description: "Convert your website or idea into a beautiful mobile app. iOS & Android development made simple.",
    images: ['/twitter-image.png'],
    creator: '@mobilifyapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <StructuredData type="organization" />
        <StructuredData type="website" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 transition-colors duration-300`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <NoSSR>
            <GoogleAnalytics />
            <CrispChat />
            <WebVitals />
          </NoSSR>
        </ThemeProvider>
      </body>
    </html>
  );
}
