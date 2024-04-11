"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import { useForm, SubmitHandler } from "react-hook-form";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import { WritePost } from "@/modules";

import { Divider } from "@/components/Divider";

import style from "./write.module.css";
import "react-quill/dist/quill.snow.css";

export default function Write() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WritePost>();

  const [myPosition, setMyPosition] = useState<string>("");
  const [enemyPosition, setEnemyPosition] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const myPositionHandler = (position: string) => {
    setMyPosition(position);
  };

  const enemyPositionHandler = (position: string) => {
    setEnemyPosition(position);
  };

  const onSubmit: SubmitHandler<WritePost> = (data) => {
    console.log("data", data);
  };

  return (
    <main className={style.main}>
      <div className={style.title}>게시글 작성</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <input
              type="text"
              placeholder="제목"
              {...register("title", { required: true })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="롤문철#KR1"
              {...register("lolName", { required: true })}
            />
          </div>
        </div>
        <div>
          <label>나</label>
          <div className={style.positions}>
            <Image
              src="/top.png"
              alt="top"
              onClick={() => myPositionHandler("top")}
              width={80}
              height={80}
              style={{
                opacity: myPosition === "top" ? 1 : 0.4,
              }}
            />
            <Image
              src="/mid.png"
              alt="mid"
              onClick={() => myPositionHandler("mid")}
              width={80}
              height={80}
              style={{
                opacity: myPosition === "mid" ? 1 : 0.4,
              }}
            />
            <Image
              src="/jg.png"
              alt="jg"
              onClick={() => myPositionHandler("jg")}
              width={80}
              height={80}
              style={{
                opacity: myPosition === "jg" ? 1 : 0.4,
              }}
            />
            <Image
              src="/bottom.png"
              alt="bottom"
              onClick={() => myPositionHandler("bottom")}
              width={80}
              height={80}
              style={{
                opacity: myPosition === "bottom" ? 1 : 0.4,
              }}
            />
            <Image
              src="/sp.png"
              alt="sp"
              onClick={() => myPositionHandler("sp")}
              width={80}
              height={80}
              style={{
                opacity: myPosition === "sp" ? 1 : 0.4,
              }}
            />
          </div>
        </div>
        <div>
          <label>상대</label>
          <div className={style.positions}>
            <Image
              src="/top.png"
              alt="top"
              onClick={() => enemyPositionHandler("top")}
              width={80}
              height={80}
              style={{
                opacity: enemyPosition === "top" ? 1 : 0.4,
              }}
            />
            <Image
              src="/mid.png"
              alt="mid"
              onClick={() => enemyPositionHandler("mid")}
              width={80}
              height={80}
              style={{
                opacity: enemyPosition === "mid" ? 1 : 0.4,
              }}
            />
            <Image
              src="/jg.png"
              alt="jg"
              onClick={() => enemyPositionHandler("jg")}
              width={80}
              height={80}
              style={{
                opacity: enemyPosition === "jg" ? 1 : 0.4,
              }}
            />
            <Image
              src="/bottom.png"
              alt="bottom"
              onClick={() => enemyPositionHandler("bottom")}
              width={80}
              height={80}
              style={{
                opacity: enemyPosition === "bottom" ? 1 : 0.4,
              }}
            />
            <Image
              src="/sp.png"
              alt="sp"
              onClick={() => enemyPositionHandler("sp")}
              width={80}
              height={80}
              style={{
                opacity: enemyPosition === "sp" ? 1 : 0.4,
              }}
            />
          </div>
        </div>
        <Divider />
        <div
          style={{
            height: "380px",
          }}
        >
          <label>내용</label>
          <ReactQuill
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["clean"],
              ],
            }}
            value={content}
            onChange={setContent}
            style={{
              height: "300px",
              width: "100%",
            }}
          />
        </div>
        <div>
          <label>요약</label>
          <textarea rows={3} {...register("point", { required: true })} />
        </div>
        <button className={style.submitBtn} type="submit">
          작성
        </button>
      </form>
    </main>
  );
}
