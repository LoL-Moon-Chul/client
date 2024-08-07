'use client';

import Link from 'next/link';

import { deleteCookie } from 'cookies-next';

import { Button } from './Button';

import { useUser } from '@/hooks/useUser';

import styles from './header.module.css';

export const Header = () => {
  const { user } = useUser();

  const onClickLogout = () => {
    deleteCookie('lmc_asct');
    deleteCookie('lmc_rsct');
    location.reload();
  };

  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>롤문철</div>
      </Link>
      <div>
        {user ? (
          <div className={styles.box}>
            <Link href="/write">
              <Button color="#fff" backgroundColor="#28344e" text="글 쓰기" />
            </Link>
            <Link href="/my">
              <Button
                color="#28344e"
                backgroundColor="#ebeef1"
                text="내 게시글"
              />
            </Link>
            <Button onClick={onClickLogout} text="로그아웃" />
          </div>
        ) : (
          <Link href="/login">
            <Button text="로그인" />
          </Link>
        )}
      </div>
    </div>
  );
};
