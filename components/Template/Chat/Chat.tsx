import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";

const Chat = ({ receiver }: { receiver: string }) => {
  const [roomId, setRoomId] = useState<string>("");
  const [totalComments, setTotalComments] = useState<any>([]);
  const [message, setMessage] = useState<string>("");

  const { data } = useUserData();
  const userId = data?.userId;

  // 새로운 방을 만들거나, 그 user와의 방 정보를 가져오는 함수
  const createChatRoom = async () => {
    console.log("createChatRoom 함수 실행 중");

    console.log(userId, receiver);
    try {
      const response = await fetch("/api/createChatRoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1Id: data.userId, user2Id: receiver }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setRoomId(result.roomId);
        console.log(roomId);
      } else {
        console.error("Failed to create chat room");
      }
    } catch (error) {
      console.error("Error creating chat room:", error);
    }
  };

  useEffect(() => {
    if (roomId === "") {
      createChatRoom();
    }
  }, [receiver]);

  // 내가 속한 db 방의 데이터를 가져오는 함수
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
          console.log("내 챗팅방", await res.json());
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [data]);

  // chat 정보를 가져오는 함수
  useEffect(() => {
    const fetchChat = async () => {
      const res = await fetch("/api/findChat");
      const data = await res.json();
      setTotalComments(data);
    };

    fetchChat();
  }, [data]);

  // chat 정보를 넘겨주는 함수
  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      { cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string }
    );

    const channel = pusher.subscribe("chat");
    channel.bind("hello", (item: any) => {
      try {
        const parsedComments = JSON.parse(item.message);

        setTotalComments((prev: any) => [...prev, parsedComments]);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const onHanldeSubmit = async () => {
    try {
      console.log("postChat 함수가 실행 중");
      await fetch("api/postChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderUserId: data.userId,
          receiverUserId: receiver,
          message: message,
          roomId: roomId,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {roomId ? <p>Chat Room ID: {roomId}</p> : <p>Creating chat room...</p>}
      {totalComments &&
        totalComments.map((item: any, idx: number) => (
          <div key={idx}>
            <span>{item.sender_user_id}</span>
            <span>{item.message}</span>
          </div>
        ))}
      <>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={onHanldeSubmit}>전송</button>
      </>
    </div>
  );
};

export default Chat;
