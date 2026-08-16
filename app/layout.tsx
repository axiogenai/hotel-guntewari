import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Guntewari | Pure Veg Fine Dining — Peth Vadgaon, Kolhapur",
  description: "Experience authentic Maharashtrian & North Indian fine dining at Hotel Guntewari, Peth Vadgaon, Kolhapur. 100% pure vegetarian, AC dining, valet parking, and celebrations. Reserve your table today.",
  keywords: ["Hotel Guntewari", "pure veg restaurant", "Peth Vadgaon", "Kolhapur", "Maharashtrian food", "fine dining", "vegetarian restaurant", "family dining"],
  openGraph: {
    title: "Hotel Guntewari | Pure Veg Fine Dining — Peth Vadgaon, Kolhapur",
    description: "Authentic Maharashtrian & North Indian fine dining. 100% pure vegetarian, AC dining, valet parking.",
    type: "website",
    locale: "en_IN",
    siteName: "Hotel Guntewari",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel Guntewari | Pure Veg Fine Dining",
    description: "Authentic Maharashtrian & North Indian fine dining in Peth Vadgaon, Kolhapur.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
