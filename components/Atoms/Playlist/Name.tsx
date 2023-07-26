import { GetServerSideProps } from "next";
import styles from "../../Style/Playlist.module.css";

const Name = () => {
  const name: string = "[playlist] 한여름 밤 코딩하는 그대를 위한 플레이리스트";
  return (
    <div className={styles.name}>
      <span>{name}</span>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {

//     return {
//         props:{

//         }
//     }
// }

export default Name;
