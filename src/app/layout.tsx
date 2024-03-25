import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import QueryProvider from "./provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cookhub",
  description: "Discover and share delightful recipes."
};

const noto = Noto_Sans_KR({
  subsets: ["latin"] // 또는 preload: false
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
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
