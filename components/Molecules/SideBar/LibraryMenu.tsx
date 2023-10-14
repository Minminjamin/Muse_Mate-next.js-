import { GetStaticPaths, GetStaticProps } from "next";
import { CiStar } from "react-icons/ci";
import { BsFillFileEarmarkPlayFill } from "react-icons/bs";
import { PiChatCircleTextFill } from "react-icons/pi";
import { IconType } from "react-icons";
import List from "@/components/Atoms/Menu/MemuList";
import styles from "../SideBar/List.module.css";
const LibraryMenu = () => {
  const libraryMenu: string[] = ["FRIEND", "PLAYLIST", "CHAT"];
  const libraryIcon: IconType[] = [
    CiStar,
    BsFillFileEarmarkPlayFill,
    PiChatCircleTextFill,
  ];

  return (
    <ul className={styles.list}>
      <h2>LIBRARY</h2>
      {libraryMenu.map((item, index) => (
        <List menu={item} icon={libraryIcon[index]} key={index} />
      ))}
    </ul>
  );
};

export default LibraryMenu;
