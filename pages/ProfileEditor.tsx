import Img from "@/components/Atoms/Profile/Img";
import { use, useEffect, useState } from "react";

const ProfileEditor = () => {
  const [user, setUser] = useState();
  const [userObjectId, setUserObjectId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [profileImg, setProfileImg] = useState();
  const [file, setFile] = useState<File | null>();
  const [newProfileImgUrl, setNewProfileImgUrl] = useState<string | null>(null);

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

  const onHandleUpdate = async (e: { preventDefault: () => void }) => {
    // e.preventDefault();
    try {
      const formData = new FormData();
      let res;
      if (file) {
        formData.append("file", file);

        // 이미지 업로드와 프로필 정보 업데이트를 동시에 실행
        const [resImg, resProfile] = await Promise.all([
          fetch("api/UpdateProfileImg", {
            method: "POST",
            body: formData,
          }),
          fetch("api/UpdateProfile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: userObjectId,
              user_id: userId,
              name: name,
              profile_img: profileImg,
            }),
          }),
        ]);

        if (resImg.ok && resProfile.ok) {
          console.log("프로필 정보 업데이트 성공");
        } else {
          console.log("프로필 정보 업데이트 실패");
        }
      } else {
        res = await fetch("api/UpdateProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: userObjectId,
            user_id: userId,
            name: name,
            // profile_img: profileImg,
            // new_profile_img_url: newProfileImgUrl,
          }),
        });
        if (res.ok) {
          console.log("프로필 정보 업데이트 성공");
        } else {
          console.log("프로필 정보 업데이트 실패");
        }
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
