import { Rabbitmq } from "@/Rabbitmq";
import FeedbackWrapper from "@/components/FeedbackWrapper";
import Header from "@/components/Header";
import PreConfig from "@/components/PreConfig";
import { Inter } from "next/font/google";
import "./globals.css";
import { StreamComp } from "@/components/Stream";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rtsp Detector",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FeedbackWrapper />
        <PreConfig />
        <Header />
        {children}
        <Rabbitmq />
        <StreamComp />
      </body>
    </html>
  );
}
