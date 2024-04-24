"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import dayjs from "dayjs";
import { useInView } from "react-intersection-observer";

import { usePost } from "@/hooks/usePost";

import { LargeButton } from "@/components/LargeButton";

import styles from "./page.module.css";

export default function Home() {
  const { data, fetchNextPage } = usePost();

  const [ref, inView] = useInView();

  const getLineImage = (line: string) => {
    switch (line) {
      case "top":
        return "/top.png";
      case "jungle":
        return "/jg.png";
      case "mid":
        return "/mid.png";
      case "bottom":
        return "/bottom.png";
      case "support":
        return "/sp.png";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className={styles.main}>
      {data.map((post) => (
        <div key={post.postId} className={styles.card}>
          <div className={styles.cardHeader}>{post.title}</div>
          <div className={styles.cardBody}>
            <div className={styles.left}>
              <div className={styles.postionImage}>
                <Image
                  src={getLineImage(post.lineA)}
                  alt="myPosition"
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.user}>플레이어1</div>
            </div>
            <div className={styles.middle}>
              <div className={styles.date}>
                {dayjs(post.createdAt).format("YYYY.MM.DD HH:mm")}
              </div>
              <div className={styles.vote}>
                <span
                  className={styles.voteCount}
                  style={{
                    color: post.voteA > post.voteB ? "#46cfa7" : "#333",
                  }}
                >
                  {post.voteA}
                </span>
                <span className={styles.colon}>:</span>
                <span
                  className={styles.voteCount}
                  style={{
                    color: post.voteB > post.voteA ? "#46cfa7" : "#333",
                  }}
                >
                  {post.voteB}
                </span>
              </div>
              <div className={styles.detailButton}>
                <Link href={`/post/${post.postId}`}>
                  <LargeButton text="상세보기" />
                </Link>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.postionImage}>
                <Image
                  src={getLineImage(post.lineB)}
                  alt="enemyPosition"
                  layout="responsive"
                  width={100}
                  height={100}
                />
              </div>
              <div className={styles.user}>플레이어2</div>
            </div>
          </div>
        </div>
      ))}
      <div ref={ref} />
    </main>
  );
}
