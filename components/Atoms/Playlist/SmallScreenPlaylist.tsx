import { GetServerSideProps } from "next";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

const SmallScreenPlaylist = () => {
  const playlistImg: StaticImport = require("../../../public/playlist basic img.jpg");

  return (
    <div>
      <Image src={playlistImg} alt="playlists" width={450} height={230} />
    </div>
  );
};

export default SmallScreenPlaylist;
