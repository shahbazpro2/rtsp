import Header from "@/components/Header";
import { StreamComp } from "@/components/Stream";
import { Inter } from "next/font/google";
import "./globals.css";
import PreConfig from "@/components/PreConfig";
import FeedbackWrapper from "@/components/FeedbackWrapper";

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
        {/*  <Rabbitmq /> */}
        <StreamComp />
      </body>
    </html>
  );
}
