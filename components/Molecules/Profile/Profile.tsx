import { GetServerSideProps } from "next";
import Img from "@/components/Atoms/Profile/Img";
import Name from "@/components/Atoms/Profile/Name";
import styles from "../../Style/Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.wrap}>
      <Img />
      <Name />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Profile;
