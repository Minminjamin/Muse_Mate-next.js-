"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loginMethod, setLoginMethod] = useState<string>();

  if (session) {
    router.push("/");
    return null;
  }

  const onHandleSignUp = async () => {
    try {
      const response = await fetch("/api/auth/SignUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          loginMethod,
        }),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const data = await response.json();
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={onHandleSignUp}>회원가입</button>
      <select
        value={loginMethod}
        onChange={(e) => setLoginMethod(e.target.value)}
      >
        <option value="kakao">카카오 로그인</option>
        <option value="google">구글 로그인</option>
      </select>
    </div>
  );
};

export default SignUpPage;
