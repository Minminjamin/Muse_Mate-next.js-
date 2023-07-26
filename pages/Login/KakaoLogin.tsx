"use client";

// https://jforj.tistory.com/237
// https://developers.kakao.com/docs/latest/ko/kakaologin/js#req-user-info
import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";

// const { Kakao } = window;

const KakaoLoginn = () => {
  // const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // const initKakao = () => {
  //   if (Kakao && !Kakao.isInitialized()) {
  //     Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  //   }
  // };

  // useEffect(() => {
  //   initKakao();
  // }, []);

  // const Login = () => {
  //   console.log("click");
  //   if (Kakao?.Auth) {
  //     Kakao.Auth.authorize({
  //       redirectUri: "http://localhost:3000/",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://developers.kakao.com/sdk/js/kakao.js";
  //   script.async = true;
  //   document.body.appendChild(script);

  //   script.onload = () => {
  //     window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  //     setIsInitialized(true);
  //   };

  //   document.body.appendChild(script);
  // }, []);

  // const Login = () => {
  //   if (window.Kakao?.Auth && isInitialized) {
  //     window.Kakao.Auth.login({
  //       success: (res: any) => {
  //         res.API.request({
  //           url: "/v2/user/me",
  //           success: (res: any) => {
  //             console.log(res);
  //             console.log("Loginn Success");
  //             Router.push("/");
  //           },
  //           fail: (error: any) => {
  //             console.log("error num1");
  //             console.log(error);
  //           },
  //         });
  //       },
  //       fail: (error: any) => {
  //         console.log("error num2");
  //         console.log(error);
  //       },
  //     });
  //   } else {
  //     console.error("Kakao SDK not initialized.");
  //   }
  // };
  return (
    <div>
      <h3>로그인</h3>
      <button>카카오 로그인</button>
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
