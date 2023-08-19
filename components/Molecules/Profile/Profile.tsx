import { GetServerSideProps, GetStaticProps } from "next";
import Img from "@/components/Atoms/Profile/Img";
import Name from "@/components/Atoms/Profile/Name";
import styles from "../../Style/Profile.module.css";
import { useEffect, useState } from "react";

// const prisma = new PrismaClient();
// https://velog.io/@bellecode20/%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EB%90%90%EB%8A%94%EC%A7%80-Session%EC%9C%BC%EB%A1%9C-%ED%99%95%EC%9D%B8%ED%95%98%EA%B8%B0-Session%EC%97%90%EC%84%9C-%EC%A0%95%EB%B3%B4-%EA%BA%BC%EB%82%B4%EC%98%A4%EA%B8%B0-vdfy2p20
const Profile = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Profile");
        const data = await res.json();

        if (res.ok) {
          setUser(data);
          // console.log(user);
        } else {
          console.log("Api 오류 : ", data);
        }
      } catch (error) {
        console.log("네트워크 에러", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);
  return (
    <div className={styles.wrap}>
      <Img user={user} />
      <div className={styles.name}>
        <Name user={user} />
      </div>
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//   const session = await getSession(ctx);

//   if (!session?.user) {
//     return {
//       redirect: {
//         destination: "/Login/Login",
//         permanent: false,
//       },
//     };
//   }

//   const res = await fetch("/api/Profile");
//   const user = await res.json();

// const session = await getSession(ctx);

// if (!session?.user) {
// }

// const res = await axios.get("http://localhost:3000/api/Profile");
// const user = await res.data.json();

// const session = await getSession(ctx);

// if (!session?.user) {
//   console.log("로그인을 해주세요");
// }

// const user_email: string | null = session?.user?.email || "";

// const db_user = await prisma.user.findUnique({
//   where: { email: user_email },
// });

//   return {
//     props: { user },
//   };
// };

export default Profile;
