import React from "react";
import Friend from "./Friend";
import UserImage from "./UserImage";
import { IoMdPersonAdd } from "react-icons/io";

const Post = ({
  key,
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  return (
    <div className="flex flex-col space-y-4   text-black bg-white p-5 w-96 rounded-xl">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <div className="flex flex-col justify-center items-center ">
        <div>
          <p>{description}</p>
        </div>
        <div>
          {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
