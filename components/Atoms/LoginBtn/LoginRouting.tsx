import React from "react";
import { FiLogIn } from "react-icons/fi";
import styles from "../LoginBtn/LoginRouting.module.css";
import { useRouter } from "next/router";

const LoginRouting = () => {
  const router = useRouter();

  return (
    <h3
      className={styles.plsLogin}
      onClick={() => {
        router.push("/Login/Login");
      }}
    >
      <FiLogIn />
      <div className={styles.name}>
        <h3>로그인</h3>
      </div>
    </h3>
  );
};

export default LoginRouting;
