import { postAPI } from "@/modules";

import dayjs from "dayjs";

import { Button } from "@/components/Button";

import styles from "./post.module.css";

export default async function Post({
  params: { id },
}: {
  params: { id: number };
}) {
  const post = await postAPI.getPostDetail(id);

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        <h1>{post.title}</h1>
        <div>
          <span>{post.memberName}</span>
          <span>{dayjs(post.createdAt).format("YYYY.MM.DD HH:mm")}</span>
        </div>
      </div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className={styles.label}>요약</div>
      <div className={styles.point}>{post.point}</div>
      <div className={styles.voteBox}>
        <Button color="#fff" backgroundColor="#28344e" text="투표A" />
        <Button text="투표B" />
      </div>
    </main>
  );
}
