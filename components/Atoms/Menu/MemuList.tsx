import { GetStaticPaths, GetStaticProps } from "next";
import { IconType } from "react-icons";
import styles from "../Menu/List.module.css";

const MenuList = ({ icon: Icon, menu }: { icon: IconType; menu: string }) => {
  return (
    <li className={styles.wrap}>
      <h4>
        <Icon className={styles.icon} />
        {menu}
      </h4>
    </li>
  );
};

export default MenuList;
