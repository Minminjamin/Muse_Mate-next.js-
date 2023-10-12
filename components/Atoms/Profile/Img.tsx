import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "../Profile/Profile.module.css";

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
      width={widthSize | 54}
      height={heightSize | 54}
      className={styles.img}
    />
  );
};

export default Img;
