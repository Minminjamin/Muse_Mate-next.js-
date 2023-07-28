"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import KakaoLoginn from "./KakaoLogin";

const LoginPage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (session) {
    router.push("/");
    return null;
  }

  const onHandleLogin = async () => {
    try {
      await signIn("credentials", { email, password });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h3>로그인</h3>
      {/* <KakaoLoginn />
      <GoogleLogin /> */}
      <button onClick={onHandleLogin}>로그인</button>
    </div>
  );
};

export default LoginPage;
