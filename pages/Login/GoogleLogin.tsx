"use client";

import { GetServerSideProps } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const GoogleLogin = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.name} 님 반값습니다.
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <div>
      <h3>구글 로그인</h3>
      <button onClick={() => signIn("google")}>로그인</button>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     return {
//         props:{

//         }
//     }
// }

export default GoogleLogin;
