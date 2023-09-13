import Img from "@/components/Atoms/Profile/Img";
import { use, useEffect, useState } from "react";

const ProfileEditor = () => {
  const [user, setUser] = useState();
  const [userObjectId, setUserObjectId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [profileImg, setProfileImg] = useState();
  const [file, setFile] = useState<File | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Profile");
        const data = await res.json();

        if (res.ok) {
          setUserObjectId(data.id);
          setUser(data);
          setName(data.name);
          setUserId(data.user_id);
          setProfileImg(data.profile_img);
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
      const formData = new FormData();

      if (file) {
        formData.append("file", file);
      }
      const res = await fetch("api/UpdateProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userObjectId,
          user_id: userId,
          name: name,
          profile_img: profileImg,
          formData: formData,
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
  const onHandleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const imgFile = ;
    if (e.target.files) {
      setFile(e.target.files[0]);
      // console.log(file);
    }
  };

  return (
    <div>
      <form>
        <Img user={user} />
        <input type="file" onChange={onHandleChangeImg}></input>
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
