// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import SideBar from "@/components/Template/Sidebar/Sidebar";
// import "main.modlue.css";
import "../styles/globals.css";
import styles from "../styles/Main.module.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={styles.container}>
        <SideBar />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
