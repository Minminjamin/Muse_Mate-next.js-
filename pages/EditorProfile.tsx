import Img from "@/components/Atoms/Profile/Img";
import Name from "@/components/Atoms/Profile/Name";
import { GetStaticPaths, GetStaticProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";

// 페이지 접근차단 미들웨어
// 유저 정보 받아오기
// {userId}/EditorProfile
const EditorProfile = () => {
  const [user, setUser] = useState([]);

  const [name, setName] = useState();
  const [id, setId] = useState();
  // const [profileImg, setProfileImg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Profile");
        const data = await res.json();

        if (res.ok) {
          setUser(data);
          setName(data.name);
          setId(data.id);
          // setProfileImg(data.profileImg);
          // setUser(data);
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
  return (
    <div>
      <Img user={user} />
      <Name user={user} />
      <h3>{id}</h3>
      {/* {id}
      {name} */}
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

export default EditorProfile;
