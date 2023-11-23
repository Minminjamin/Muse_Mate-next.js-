import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";

const Chat = ({ receiver }: { receiver: string }) => {
  const [roomId, setRoomId] = useState<string>("");
  const { data } = useUserData();
  const userId = data?.userId;

  const createChatRoom = async () => {
    console.log("함수 실행 중");
    console.log(userId, receiver);
    try {
      const response = await fetch("/api/createChatRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1Id: userId, user2Id: receiver }),
      });

      if (response.ok) {
        const result = await response.json();
        setRoomId(result.roomId);
      } else {
        console.error("Failed to create chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  useEffect(() => {
    // Check if a chat room already exists
    if (roomId === "") {
      createChatRoom();
    }
  }, []);

  return (
    <div>
      {roomId ? <p>Chat Room ID: {roomId}</p> : <p>Creating chat room...</p>}
    </div>
  );
};

export default Chat;
