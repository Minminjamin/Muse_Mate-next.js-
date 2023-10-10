import { GetServerSideProps } from "next";
import Image from "next/image";

const SmallScreenPlaylist = () => {
  const playlistImg = require("../../../public/playlist basic img.jpg");
  return (
    <div>
      <Image src={playlistImg} alt="playlists" width={450} height={230} />
    </div>
  );
};

export default SmallScreenPlaylist;
