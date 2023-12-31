import { GetServerSideProps } from "next";
import { useEffect } from "react";
import styles from "../Profile/Profile.module.css";

// 부모 컴포넌트나 커스텀 훅으로 데이터 받을 수 있게 설정
const Name = ({ name }: { name: string }) => {
  return <h3 className={styles.name}>{name}</h3>;
};

export default Name;
