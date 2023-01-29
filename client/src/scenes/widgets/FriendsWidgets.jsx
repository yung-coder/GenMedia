import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../../components/Friend";
import { setFriends } from "../../state/index";

const FriendsWidgets = ({ userID }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const getFriends = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userID}/friends`,
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

  console.log(friends);
  return (
    <div className="bg-white w-full h-fit flex flex-col rounded-lg p-4">
      <div className="flex">
        <h1 className="text-black font-bold">Friends</h1>
      </div>
      <div className="mt-2">
        {friends.map((friend) => (
          <div className="p-4">
            <Friend
              key={friend._id}
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
