"use client";

import { useEffect } from "react";

import { useInView } from "react-intersection-observer";

import { usePost } from "@/hooks/usePost";

import { PostCard } from "@/components/PostCard";

import styles from "./page.module.css";

export default function Home() {
  const { data, fetchNextPage } = usePost();

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <main className={styles.main}>
      {data.map((post) => (
        <PostCard post={post} key={post.postId} />
      ))}
      <div ref={ref} />
    </main>
  );
}
