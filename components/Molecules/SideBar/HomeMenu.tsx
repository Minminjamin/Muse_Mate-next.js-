import { GetStaticPaths, GetStaticProps } from "next";
import List from "@/components/Atoms/SideBar/MemuList";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdMusicalNotes, IoMdHeadset } from "react-icons/io";
import { BsMic } from "react-icons/bs";
import { IconType } from "react-icons";
import styles from "../../Style/List.module.css";

const HomeMenu = () => {
  const homeMenu: string[] = ["DISCOVER", "GENRE", "TOP CHARTS", "PODCAST"];
  const homeIcon = [BiSearchAlt, IoMdMusicalNotes, IoMdHeadset, BsMic];

  return (
    <ul className={styles.list}>
      <h2>HOME</h2>
      {homeMenu.map((item, index) => (
        <List menu={item} icon={homeIcon[index]} key={index} />
      ))}
    </ul>
  );
};

// export const getStaticPaths: GetStaticPaths = () => {
//   return {
//     paths: [],
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   return {
//     props: {},
//   };
// };

export default HomeMenu;
