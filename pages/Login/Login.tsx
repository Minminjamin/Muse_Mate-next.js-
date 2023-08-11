"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h3>환영합니다, {session.user?.name} 님 반값습니다.</h3>
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <div>
      <h1>로그인</h1>
      <button onClick={() => signIn("google")}> Google</button>
      <button onClick={() => signIn("kakao")}> Kakao</button>
    </div>
  );
};

export default Login;
