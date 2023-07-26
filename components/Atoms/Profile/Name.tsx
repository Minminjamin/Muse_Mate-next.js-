import { GetServerSideProps } from "next";
import { useEffect } from "react";
import styles from "../../Style/Profile.module.css";
// 부모 컴포넌트나 커스텀 훅으로 데이터 받을 수 있게 설정
const Name = () => {
  const name: string = "jamin";

  return (
    <div>
      <h3 className={styles.name}>{name}</h3>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Name;
