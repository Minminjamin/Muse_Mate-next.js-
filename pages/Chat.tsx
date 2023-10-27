import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { useUserData } from "@/hooks/useUserData";

const Chat = () => {
  const [message, setMessage] = useState<string>("");
  const [totalComments, setTotalComments] = useState<any>([]);

  const { data } = useUserData();

  useEffect(() => {
    const fetchChat = async () => {
      const res = await fetch("/api/findChat");
      const data = await res.json();
      setTotalComments(data);
    };

    fetchChat();
  }, []);

  useEffect(() => {
    const pusher = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
      { cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string }
    );

    const channel = pusher.subscribe("chat");
    channel.bind("hello", (data: any) => {
      const parsedComments = JSON.parse(data.message);

      setTotalComments((prev: any) => [...prev, parsedComments]);
    });

    return () => {
      pusher.unsubscribe("chat");
    };
  }, []);

  const onHanldeSubmit = async () => {
    try {
      const res = await fetch("api/postChat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderUserId: data?.user_id,
          receiverUserId: "dgubr_ai0i",
          message: message,
        }),
      });

      if (res.ok) console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {totalComments &&
        totalComments.map((item: any, idx: number) => (
          <div key={idx}>
            <span>{item.sender_user_id}</span>
            <span>{item.message}</span>
          </div>
        ))}
      <form>
        <input type="text" onChange={(e) => setMessage(e.target.value)} />
        <button onClick={onHanldeSubmit}>전송</button>
      </form>
    </>
  );
};

export default Chat;
