import { GetServerSideProps, GetStaticProps } from "next";
import Img from "@/components/Atoms/Profile/Img";
import Name from "@/components/Atoms/Profile/Name";
import styles from "../Profile/Profile.module.css";
import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { FiLogIn } from "react-icons/fi";
import { useRouter } from "next/router";
import LoginRouting from "@/components/Atoms/LoginBtn/LoginRouting";
import Profile from "@/components/Molecules/Profile/Profile";

// const prisma = new PrismaClient();
// https://velog.io/@bellecode20/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%90%90%EB%8A%94%EC%A7%80-Session%EC%9C%BC%EB%A1%9C-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0-Session%EC%97%90%EC%84%9C-%EC%A0%95%EB%B3%B4-%EA%BA%BC%EB%82%B4%EC%98%A4%EA%B8%B0-vdfy2p20
const ProfileOrLoginRouting = (user) => {
  // const [user, setUser] = useState([]);

  // const { data: session } = useSession();
  // const session = await getSession();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/api/Profile");
  //       const data = await res.json();

  //       if (res.ok) {
  //         setUser(data);
  //         // console.log(user);
  //       } else {
  //         console.log("Api 오류 : ", data);
  //       }
  //     } catch (error) {
  //       console.log("네트워크 에러", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className={styles.wrap}>
      {user ? (
        <Profile />
      ) : (
        // <>
        //   <Img user={user} heightSize={54} widthSize={54} />
        //   <div className={styles.name}>
        //     <Name user={user} />
        //   </div>
        // </>
        <LoginRouting />
        // <>
        //   <h3 className={styles.plsLogin} onClick={onHandleLogin}>
        //     <FiLogIn />
        //     <div className={styles.name}>
        //       <h3>로그인</h3>
        //     </div>
        //   </h3>
        // </>
      )}
    </div>
  );
};

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const res = await fetch("/api/Profile");
//   const user = await res.json();
//   return {
//     props: { user },
//   };
// };

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const session = await getSession(ctx);
  // const isLogin = session?.user;

  return {
    props: {},
  };
};

export default ProfileOrLoginRouting;
