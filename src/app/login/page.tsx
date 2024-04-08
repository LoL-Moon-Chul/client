"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { setCookie } from "cookies-next";

import { memberAPI } from "@/modules";

import style from "./login.module.css";

const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL}&response_type=code`;

export default function Login() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loginCode, setLoginCode] = useState<string | null>(null);

  const code = searchParams.get("code");

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  useEffect(() => {
    if (!loginCode && code) {
      setLoginCode(code);
    }
  }, [code]);

  useEffect(() => {
    if (loginCode) {
      (async () => {
        const { accessToken, refreshTokens } = await memberAPI.login(loginCode);
        if (!accessToken || !refreshTokens) return;
        setCookie("lmc_asct", accessToken);
        setCookie("lmc_rsct", refreshTokens);
        router.push("/");
      })();
    }
  }, [loginCode, router]);

  return (
    <main className={style.main}>
      <div className={style.title}>로그인</div>
      <div className={style.desc}>롤문철에 오신 것을 환영합니다.</div>
      <div className={style.kakao} onClick={handleLogin}>
        카카오 로그인
      </div>
    </main>
  );
}
