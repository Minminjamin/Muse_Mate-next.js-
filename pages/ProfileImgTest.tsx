import Img from "@/components/Atoms/Profile/Img";
import { off } from "process";
import React, { use, useEffect, useState } from "react";

const ProfileImgTest = () => {
  const [user, setUser] = useState();
  const [userObjectId, setUserObjectId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  // const [profileImg, setProfileImg] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Profile");
        const data = await res.json();

        if (res.ok) {
          setUserObjectId(data.id);
          setUser(data);
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

  const onHandleChameImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const imgFile = ;
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log(file);
    }
  };

  useEffect(() => {
    console.log(file);
  }, [file]);
  const onHandleUpdate = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("img", file);
        const res = await fetch("api/UpdateProfileImg", {
          method: "POST",
          body: formData,
        });

        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onHandleUpdate}>
      <Img user={user} />
      <input type="file" onChange={onHandleChameImg} />
      <button type="submit">일단 저장</button>
    </form>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     return {
//         props:{

//         }
//     }
// }

export default ProfileImgTest;
