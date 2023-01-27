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
    <div className="flex flex-col w-fit  text-black">
        <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        />
        <div>
          <p>{description}</p>
        </div>
        <div className="w-[50%] h-[50%]">
          {picturePath && (
            <img
              width="100%"
              height="auto"
              alt="post"
              style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
              src={`http://localhost:3001/assets/${picturePath}`}
            />
          )}
        </div>
    </div>
  );
};

export default Post;
