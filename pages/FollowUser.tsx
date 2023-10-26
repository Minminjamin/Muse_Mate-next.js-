import Search from "@/components/Atoms/Search/Search";
import PageName from "@/components/Atoms/Title/PageName";
import { useUserData } from "@/hooks/useUserData";

import React, {
  ReactComponentElement,
  ReactElement,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  name: string;
};

const FollowUser = () => {
  const [input, setInput] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectUser, setSelectUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const { isLoading, isError, error, data } = useUserData();

  useEffect(() => {
    setUserId(data?.user_id);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("api/IsFollow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            followId: selectUser?.id,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          setIsFollow(data.isFollow);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const onUserSearch = async () => {
    try {
      const res = await fetch("api/SearchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, searchUserId: input }),
      });

      if (res.ok) {
        const data = await res.json();
        setSearchResult(data);
        console.log(searchResult);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleClickUserProfile = (item: User) => {
    setSelectUser(item);
    setIsOpen(true);
  };

  const onHandleClickFollow = async () => {
    try {
      const res = await fetch("api/Follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          followId: input,
        }),
      });

      if (res.ok) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleClickUnFollow = async () => {
    try {
      const res = await fetch("api/UnFollow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          followId: input,
        }),
      });

      if (res.ok) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <PageName pageName={"SearchUser"} />

      <Search
        value={input}
        onHandleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        search={onUserSearch}
        placeholder="검색할 사용자의 id(아이디)를 입력해주세요."
      />

      <div>
        <h2>검색 결과</h2>
        <ul>
          {searchResult.map((item) => (
            <li key={item.id} onClick={() => onHandleClickUserProfile(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {isOpen && selectUser && (
        <>
          <h2>프로필</h2>
          <span>{selectUser.id}</span>
          <span>{selectUser.name}</span>
          {isFollow ? (
            <button onClick={onHandleClickFollow}>Follow</button>
          ) : (
            <button onClick={onHandleClickUnFollow}>UnFollow</button>
          )}

          <button>Chat</button>
        </>
      )}
    </div>
  );
};

export default FollowUser;
