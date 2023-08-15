import Profile from "@/components/Molecules/Profile/Profile";
import HomeMenu from "@/components/Molecules/SideBar/HomeMenu";
import LibraryMenu from "@/components/Molecules/SideBar/LibraryMenu";
import { GetServerSideProps } from "next";
import { IconBaseProps } from "react-icons";
// import styles from "../SideBar/Sidebar.module.css";
import styles from "../../styles/SideBar.module.css";
const SideBar = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.menu}>
        <HomeMenu />
        <LibraryMenu />
      </div>
      <div className={styles.profile}>
        <Profile />
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     return {
//         props:{

//         }
//     }
// }

export default SideBar;
