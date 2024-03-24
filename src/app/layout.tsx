import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cookhub",
  description: "Discover and share delightful recipes."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <QueryProvider>
          {children}
          <ReactQueryDevtools />
        </QueryProvider>
        <Footer />
      </body>
    </html>
  );
}
