import "@/styles/globals.css";
import type { AppProps } from "next/app";
import KakaoLoginn from "./Login/KakaoLogin";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <KakaoLoginn />
      <Component {...pageProps} />
    </div>
  );
}
