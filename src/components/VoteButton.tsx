"use client";

import { useState } from "react";
import Image from "next/image";

import { toast } from "react-toastify";

import { Button } from "./Button";

import { useCheckVoteUser } from "@/hooks/useCheckVoteUser";
import { useUser } from "@/hooks/useUser";

import { voteAPI } from "@/modules";

import { getLineImage } from "@/utils/getLineImage";

import styles from "./votebutton.module.css";

interface VoteButtonProps {
  postId: number;
  lineA: string;
  lineB: string;
  voteA: number;
  voteB: number;
}

export const VoteButton = (props: VoteButtonProps) => {
  const { postId, lineA, lineB, voteA, voteB } = props;

  const { user } = useUser();
  const { data, mutation } = useCheckVoteUser(postId);

  const [tempVoteCount, setTempVoteCount] = useState({ voteA, voteB });

  const onClickVote = async (vote: string) => {
    if (!user) {
      toast.error("로그인 후 이용해주세요.");
      return;
    }
    if (data?.userVoted) {
      toast.error("이미 투표하셨습니다.");
      return;
    }
    await voteAPI.vote({ postId, voteOption: vote });
    setTempVoteCount((prev) => ({
      ...prev,
      [vote === "A" ? "voteA" : "voteB"]:
        prev[vote === "A" ? "voteA" : "voteB"] + 1,
    }));
    toast.success("투표 완료되었습니다.");
    mutation.mutate();
  };

  return (
    <div className={styles.voteBox}>
      <div className={styles.left}>
        <div className={styles.postionImage}>
          <Image
            src={getLineImage(lineA)}
            alt="myPosition"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.user}>플레이어1</div>
        <Button
          color="#fff"
          backgroundColor="#28344e"
          text="투표A"
          onClick={() => onClickVote("A")}
        />
      </div>
      <div className={styles.middle}>
        <div className={styles.vote}>
          <span
            className={styles.voteCount}
            style={{
              color:
                tempVoteCount.voteA > tempVoteCount.voteB ? "#46cfa7" : "#333",
            }}
          >
            {tempVoteCount.voteA}
          </span>
          <span className={styles.colon}>:</span>
          <span
            className={styles.voteCount}
            style={{
              color:
                tempVoteCount.voteB > tempVoteCount.voteA ? "#46cfa7" : "#333",
            }}
          >
            {tempVoteCount.voteB}
          </span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.postionImage}>
          <Image
            src={getLineImage(lineB)}
            alt="enemyPosition"
            layout="responsive"
            width={100}
            height={100}
          />
        </div>
        <div className={styles.user}>플레이어2</div>
        <Button text="투표B" onClick={() => onClickVote("B")} />
      </div>
    </div>
  );
};
