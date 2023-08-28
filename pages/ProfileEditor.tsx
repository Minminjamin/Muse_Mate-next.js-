import Img from "@/components/Atoms/Profile/Img";
import { use, useEffect, useState } from "react";

const ProfileEditor = () => {
  const [user, setUser] = useState([]);

  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  // const [profileImg, setProfileImg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Profile");
        const data = await res.json();

        if (res.ok) {
          setUser(data);
          setName(data.name);
          setUserId(data.user_id);
          // setProfileImg(data.profileImg);
        } else {
          console.log("Api 오류 :", data);
        }
      } catch (error) {
        console.log("네트워크 에러 :", error);
      }
    };

    fetchData();
  }, []);

  const onHandleUpdate = async () => {
    try {
      const res = await fetch("api/UpdateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          name: name,
          // profile_img: profileImg,
        }),
      });

      if (res.ok) {
        console.log("프로필 정보 업데이트 성공");
      } else {
        console.log("프로필 정보 업데이트 실패");
      }
    } catch (error) {
      console.log("네트워크 에러:", error);
    }
  };

  return (
    <div>
      <form>
        {/* <Img user={user} /> */}
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        />
        {/* <Img user={user} />
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          value={userId}
          onChange={(e) => {
            setUserId(e.target.value);
          }}
        /> */}
        <button onClick={onHandleUpdate}>저장하기</button>
      </form>
    </div>
  );
};

// export const getServerSuserideProps: GetServerSuserideProps = async (ctx) => {

//     return {
//         props:{

//         }
//     }
// }

export default ProfileEditor;
