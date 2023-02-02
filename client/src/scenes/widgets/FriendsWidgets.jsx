import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/deploy";
import Friend from "../../components/Friend";
import { setFriends } from "../../state/index";

const FriendsWidgets = ({ userID }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `${BASE_URL || 'http://localhost:3001'}/users/${userID}/friends`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-white w-[330px] h-fit flex flex-col justify-center items-center rounded-lg p-4 shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] overflow-auto">
      <div className="flex">
        <h1 className="text-black font-bold">Friends</h1>
      </div>
      <div className="mt-2">
        {friends.map((friend) => (
          <div className="p-4" key={friend._id}>
            <Friend
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsWidgets;
