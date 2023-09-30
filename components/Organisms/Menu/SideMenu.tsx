import React from "react";
import HomeMenu from "@/components/Molecules/SideBar/HomeMenu";
import LibraryMenu from "@/components/Molecules/SideBar/LibraryMenu";
import styles from "../Menu/SideMenu.module.css";

const SideMenu = () => {
  return (
    <div className={styles.wrap}>
      <HomeMenu />
      <LibraryMenu />
    </div>
  );
};

export default SideMenu;
