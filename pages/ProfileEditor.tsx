import Img from "@/components/Atoms/Profile/Img";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

const ProfileEditor = () => {
  const [user, setUser] = useState([]);

  const [name, setName] = useState<string>();
  const [id, setId] = useState<string>();
  const [profileImg, setProfileImg] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/Profile");
        const data = await res.json();

        if (res.ok) {
          setUser(data);
          setName(data.name);
          setId(data.id);
          setProfileImg(data.profileImg);
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

  const onHandleUpdate = () => {};
  return (
    <div>
      <form>
        <Img user={user} />
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <button onClick={onHandleUpdate}>저장하기</button>
      </form>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     return {
//         props:{

//         }
//     }
// }

export default ProfileEditor;
