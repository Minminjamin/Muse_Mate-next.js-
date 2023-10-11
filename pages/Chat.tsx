import React, { useEffect } from "react";
import SocketIOClient from "socket.io-client";

const Chat = () => {
  const socket = SocketIOClient("/api/chats/socket");
  useEffect(() => {
    console.log(socket);
    // socket.on("connet", () => {
    //   console.log("연결 성공이다.");
    // });
  }, [socket]);
  return <div></div>;
};

export default Chat;
