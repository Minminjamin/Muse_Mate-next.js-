import { useUserData } from "@/hooks/useUserData";
import React, { useEffect } from "react";

const ChatRoom = () => {
  const { data } = useUserData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("api/getAllChatRoom", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: data.userId }),
        });

        if (res.ok) {
          console.log(await res.json());
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return <div>test</div>;
};

export default ChatRoom;
