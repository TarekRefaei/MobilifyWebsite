import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "../components/GoogleAnalytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mobilify | Turn Your Website or Idea Into a Custom Mobile App",
  description: "Mobilify converts your existing website or new idea into a high-quality, native mobile app for iOS and Android. Get a beautiful, custom-designed app without the complexity. See our demo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased text-gray-900`}
      >
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
