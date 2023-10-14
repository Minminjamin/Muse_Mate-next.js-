import { GetServerSideProps, GetStaticProps } from "next";
import Img from "@/components/Atoms/Profile/Img";
import Name from "@/components/Atoms/Profile/Name";
import styles from "../Profile/Profile.module.css";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/router";

interface User {
  user: object;
  name: string;
  profile_img: string;
}

// const prisma = new PrismaClient();
// https://velog.io/@bellecode20/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%90%90%EB%8A%94%EC%A7%80-Session%EC%9C%BC%EB%A1%9C-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0-Session%EC%97%90%EC%84%9C-%EC%A0%95%EB%B3%B4-%EA%BA%BC%EB%82%B4%EC%98%A4%EA%B8%B0-vdfy2p20
const Profile = ({ user }: { user: User }) => {
  return (
    <div className={styles.wrap}>
      <Img profileImg={user.profile_img} heightSize={54} widthSize={54} />
      <div className={styles.name}>
        <Name name={user.name} />
      </div>
    </div>
  );
};

export default Profile;
