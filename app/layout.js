import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Rabbitmq } from "@/components/Rabbitmq";
import { StreamComp } from "@/components/Stream";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rtsp Detector",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Rabbitmq />
        <StreamComp />
      </body>
    </html>
  );
}
