import { useUserData } from "@/hooks/useUserData";
import React, { useEffect, useState } from "react";

const FollowNumber = () => {
  const { data } = useUserData();

  const [userId, setUserId] = useState<string>("");
  const [follower, setFollower] = useState(0);
  const [following, setFollowing] = useState(0);

  useEffect(() => {
    setUserId(data?.user_id);
  }, [data?.user_id]);
  // console.log();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("api/UserFollowNumber", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId }),
        });

        if (res.ok) {
          console.log("ok");
          const data = await res.json();

          console.log("팔로워", data.followerCount);
          console.log("팔로잉", data.followingCount);
          setFollower(data.followerCount);
          setFollowing(data.followingCount);

          // console.log(follower, following);
        } else {
          console.log("실패");
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [follower, following, userId]);

  useEffect(() => {
    console.log("팔로우", follower);
    console.log("팔로잉", following);
  }, [follower, following]);

  return <div></div>;
};

export default FollowNumber;
