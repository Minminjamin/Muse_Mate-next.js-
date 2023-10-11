import axios from "axios";
import { useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch("/api/Profile");

  return res.json();
};

export const useUserData = () => {
  return useQuery("user", fetchData);
};
