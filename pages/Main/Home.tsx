import SmallPlaylist from "@/components/Molecules/Playlist/SmallPlaylist";
import { GetServerSideProps } from "next";

const Home = () => {
  return (
    <div>
      <SmallPlaylist />
    </div>
  );
};

export default Home;
