import Name from "../../Atoms/Profile/Name";
import SmallScreenPlaylist from "@/components/Atoms/Playlist/SmallScreenPlaylist";
import { GetServerSideProps } from "next";

const SmallPlaylist = () => {
  return (
    <div>
      <SmallScreenPlaylist />
      <Name user={undefined} />
    </div>
  );
};

export default SmallPlaylist;
