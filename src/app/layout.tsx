import type { Metadata } from "next";

import { Noto_Sans_KR } from "next/font/google";

import { Header } from "@/components/Header";

import "./globals.css";
import styles from "./layout.module.css";
import Providers from "@/components/Providers";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "롤문철",
  description: "롤문철",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto.className}>
        <Providers>
          <div className={styles.container}>
            <Header />
            <div className={styles.content}>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
