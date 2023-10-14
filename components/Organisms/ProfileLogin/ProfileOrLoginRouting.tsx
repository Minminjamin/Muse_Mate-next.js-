import { GetServerSideProps, GetStaticProps } from "next";
import Img from "@/components/Atoms/Profile/Img";
import Name from "@/components/Atoms/Profile/Name";
import styles from "../ProfileLogin/ProfileOrLoginRouting.module.css";
import { useEffect, useState } from "react";
import LoginRouting from "@/components/Atoms/LoginBtn/LoginRouting";
import Profile from "@/components/Molecules/Profile/Profile";
import { useUserData } from "@/hooks/useUserData";

interface User {
  user: object;
  name: string;
  profile_img: string;
}
// const prisma = new PrismaClient();
// https://velog.io/@bellecode20/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%90%90%EB%8A%94%EC%A7%80-Session%EC%9C%BC%EB%A1%9C-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0-Session%EC%97%90%EC%84%9C-%EC%A0%95%EB%B3%B4-%EA%BA%BC%EB%82%B4%EC%98%A4%EA%B8%B0-vdfy2p20
const ProfileOrLoginRouting = () => {
  const [user, setUser] = useState<User>();

  const { isLoading, isError, error, data } = useUserData();

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <div className={styles.wrap}>
      {user ? <Profile user={user} /> : <LoginRouting />}
    </div>
  );
};

export default ProfileOrLoginRouting;
