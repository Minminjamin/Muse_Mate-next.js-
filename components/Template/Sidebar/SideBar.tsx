import React from "react";
import SideMenu from "@/components/Organisms/Menu/SideMenu";
import ProfileOrLoginRouting from "@/components/Organisms/ProfileLogin/ProfileOrLoginRouting";

const SideBar = () => {
  return (
    <div>
      <SideMenu />
      <ProfileOrLoginRouting />
    </div>
  );
};

export default SideBar;
