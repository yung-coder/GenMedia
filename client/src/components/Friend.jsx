import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/index";
import UserImage from "./UserImage";
import { IoMdPersonAdd } from "react-icons/io";
import { IoPersonRemoveSharp } from "react-icons/io";

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
    <div className="flex">
      <div
        className="flex justify-center items-center"
        onClick={() => {
          navigate(`/profile/${friendId}`);
          navigate(0);
        }}
      >
        <UserImage image={userPicturePath} />
        <div>
          <h1>{name}</h1>
          <h1>{subtitle}</h1>
        </div>
      </div>
      <div onClick={() => patchFriend()}>
        {isFriend ? <IoPersonRemoveSharp /> : <IoMdPersonAdd />}
      </div>
    </div>
  );
};

export default Friend;
