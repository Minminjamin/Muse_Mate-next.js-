import Search from "@/components/Atoms/Search/Search";
import PageName from "@/components/Atoms/Title/PageName";
import React, { ReactComponentElement, ReactElement, useState } from "react";

type User = {
  id: string;
  name: string;
};

const FollowUser = () => {
  const [input, setInput] = useState<string>();
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const onUserSearch = async () => {
    try {
      const res = await fetch("api/SearchUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: input }),
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

  return (
    <div>
      <PageName pageName={"SearchUser"} />
      <Search
        value={input}
        onHandleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        search={onUserSearch}
        placeholder={"검색할 사용자의 id(아이디)를 입력해주세요."}
      />

      <div>
        <h2>검색 결과</h2>
        <ul>
          {searchResult.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FollowUser;
