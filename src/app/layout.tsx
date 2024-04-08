import type { Metadata } from "next";
import Image from "next/image";

import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";
import styles from "./layout.module.css";

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "골잘알",
  description: "풋살 모집 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={noto.className}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div>롤문철</div>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
