import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "../Profile/Profile.module.css";
// 부모 컴포넌트에서 props 받아오기
// 일시적으로 any 선언, 추후 변경
const Img = ({
  user,
  widthSize,
  heightSize,
}: {
  user: any;
  widthSize: number;
  heightSize: number;
}) => {
  const profileImg = user?.profile_img;

  return (
    <Image
      src={profileImg}
      alt="user profile"
      width={widthSize}
      height={heightSize}
      className={styles.img}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // const userId = context.query.userId;
  // const profileImg = 0;
  return {
    props: {
      //   profileImg,
    },
  };
};

export default Img;
