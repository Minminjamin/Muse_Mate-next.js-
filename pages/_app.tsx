import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import KakaoLoginn from "./Login/KakaoLogin";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div>
        <KakaoLoginn />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
