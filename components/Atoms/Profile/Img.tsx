import { GetServerSideProps } from "next";
import Image from "next/image";
import styles from "../Profile/Profile.module.css";

interface ImgProps {
  profileImg: string;
  widthSize: number;
  heightSize: number;
}
const Img = ({
  // user,
  profileImg,
  widthSize,
  heightSize,
}: ImgProps) => {
  // const profileImg: string = user?.profile_img;

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
