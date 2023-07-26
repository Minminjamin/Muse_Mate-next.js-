import Name from "@/components/Atoms/Playlist/Name";
import SmallScreenPlaylist from "@/components/Atoms/Playlist/SmallScreenPlaylist";
import { GetServerSideProps } from "next";

const SmallPlaylist = () => {
  return (
    <div>
      <SmallScreenPlaylist />
      <Name />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default SmallPlaylist;
