import React from "react";
import SideMenu from "@/components/Organisms/Menu/SideMenu";
import ProfileOrLoginRouting from "@/components/Organisms/ProfileLogin/ProfileOrLoginRouting";
import styles from "../SideBar/SideBar.module.css";

const SideBar = () => {
  return (
    <div className={styles.wrap}>
      <SideMenu />
      <ProfileOrLoginRouting />
    </div>
  );
};

export default SideBar;
