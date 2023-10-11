import Img from "@/components/Atoms/Profile/Img";
import Name from "@/components/Atoms/Profile/Name";
import { useUserData } from "@/hooks/useUserData";
import { GetStaticPaths, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

// 페이지 접근차단 미들웨어
// 유저 정보 받아오기
// {userId}/MyProfile
const MyProfile = () => {
  const [user, setUser] = useState([]);

  const { isLoading, isError, error, data } = useUserData();

  useEffect(() => {
    setUser(data);
  }, [data]);
  // const [profileImg, setProfileImg] = useState();

  return (
    <div>
      <Img user={user} />
      <Name user={user} />
      <h3>{id}</h3>
      {/* {id}
      {name} */}
      <button>수정하기</button>
      <form></form>
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [],
//     fallback: false,
//   };
// };
// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const session = getSession();

//   const res = await fetch("/api/Profile");
//   const userData = await res.json();
//   return {
//     props: { userData },
//   };
// };

export default MyProfile;
