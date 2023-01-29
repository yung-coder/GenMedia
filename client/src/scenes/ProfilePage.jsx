import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostInput from "../scenes/widgets/PostInput";
import UserWidget from "../scenes/widgets/UserWidget";
import Posts from "../scenes/widgets/Posts";
import FriendsWidgets from "../scenes/widgets/FriendsWidgets";
import Navbar from "../scenes/Navbar";
const index = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const [profilePage, setProfilePage] = useState(false);

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  console.log("frined user", user);
  return (
    <>
      <Navbar />
      <div className="h-screen text-white flex flex-col md:flex md:flex-row w-screen ">
        <div className="w-[600px] flex justify-center md:justify-start ">
          <UserWidget userId={userId} picturePath={user.picturePath} />
        </div>
        <div className="w-[800px] p-5  flex flex-col space-y-5 ">
          <PostInput picturePath={user.picturePath} />
          <Posts
            userId={userId}
            profilePage={profilePage}
            setProfilePage={setProfilePage}
          />
        </div>
        <div className="flex justify-center w-[400px] p-5">
          <FriendsWidgets userID={userId} />
        </div>
      </div>
    </>
  );
};

export default index;
