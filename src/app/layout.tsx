import type { Metadata } from 'next';
import { Noto_Sans_KR } from 'next/font/google';

import { ToastContainer } from 'react-toastify';

import { Header } from '@/components/Header';
import Providers from '@/components/Providers';

import './globals.css';
import styles from './layout.module.css';
import 'react-toastify/dist/ReactToastify.css';

const noto = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: '롤문철',
  description: '롤문철',
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
            <ToastContainer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
