"use client";

// https://jforj.tistory.com/237
// https://developers.kakao.com/docs/latest/ko/kakaologin/js#req-user-info
import { GetServerSideProps } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const KakaoLoginn = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        {session.user?.name} 님 반값습니다
        <button onClick={() => signOut()}>로그아웃</button>
      </>
    );
  }
  return (
    <div>
      <h3>로그인</h3>
      <button onClick={() => signIn("kakao")}>카카오 로그인</button>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     return {
//         props:{

//         }
//     }
// }

export default KakaoLoginn;
