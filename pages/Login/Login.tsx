"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import styles from "../../styles/Login.module.css";
import googleIcon from "../../public/GoogleIcon.png";
import kakaoIcon from "../../public/kakaoIcon.png";
const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <h3>환영합니다, {session.user?.name} 님 반값습니다.</h3>
        <div onClick={() => signOut()}>
          <h4>로그아웃</h4>
        </div>
      </>
    );
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <h1 className={styles.title}>Social Login</h1>
        <div className={styles.loginBtnWrap}>
          <div onClick={() => signIn("google")} className={styles.loginBtn}>
            <Image src={googleIcon} alt="구글 icon" width={35} height={35} />
            <h4 className={styles.loginTitle}>Google</h4>
          </div>
          <div
            onClick={() => signIn("kakao")}
            className={`${styles.loginBtn} ${styles.kakaoLoginBtn}`}
          >
            <Image src={kakaoIcon} alt="카카오 icon" width={35} height={35} />
            <h4 className={styles.loginTitle}>Kakaotalk</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
