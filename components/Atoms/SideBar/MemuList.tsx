import { GetStaticPaths, GetStaticProps } from "next";
import { IconType } from "react-icons";
import styles from "../../Style/List.module.css";

const MenuList = ({ icon: Icon, menu }: { icon: IconType; menu: string }) => {
  return (
    <li className={styles.font}>
      <h4>
        <Icon /> {menu}
      </h4>
    </li>
  );
};

// export const getStaticPaths: GetStaticPaths = () => {

//     return {
//         paths:[],
//         fallback:false
//     t}
// }
// export const getStaticProps: GeStaticProps = async ({ listmenu }) => {
//     const menu = listmenu
//     return {
//         props: {
//             menu
//         }
//     }
// }

export default MenuList;
