import Name from "@/components/Atoms/Profile/Name";
import { Html, Head, Main, NextScript } from "next/document";
import KakaoLoginn from "./Login/KakaoLogin";
import SideBar from "./SideBar/SideBar";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* <Main />
        <NextScript /> */}
        <SideBar />
        <Name />
        <KakaoLoginn />
      </body>
    </Html>
  );
}
