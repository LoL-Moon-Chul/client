import type { Metadata } from "next";

import { Noto_Sans_KR } from "next/font/google";

import "./globals.css";
import styles from "./layout.module.css";
import { Button } from "@/components/Button";
import Link from "next/link";

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
        <div className={styles.container}>
          <div className={styles.header}>
            <Link href="/">
              <div className={styles.logo}>롤문철</div>
            </Link>
            <Link href="/login">
              <Button text="로그인" />
            </Link>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </body>
    </html>
  );
}
