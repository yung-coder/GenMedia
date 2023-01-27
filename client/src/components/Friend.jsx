import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/index";
import UserImage from "./UserImage";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io5";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const isFriend = friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  return (
    <div className="flex  items-center">
      <div className="flex space-x-2 items-center">
        <UserImage image={userPicturePath} />
        <div className="flex flex-col space-y-1">
          <h1>{name}</h1>
          <h2>{subtitle}</h2>
        </div>
      </div>
      <div>{isFriend ? <IoPersonRemoveSharp /> : <IoMdPersonAdd />}</div>
    </div>
  );
};

export default Friend;
