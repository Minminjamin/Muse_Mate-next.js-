import axios from "axios";
import { useQuery } from "react-query";

const useUserData = async () => {
  const res = await fetch("/api/profile");
  return res.json();
};

export default useUserData;
