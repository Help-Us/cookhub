import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import QueryProvider from "./provider";
import Footer from "@/components/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

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
