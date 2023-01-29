import React, { useState } from "react";
import Friend from "./Friend";
import UserImage from "./UserImage";
import { IoMdPersonAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";

const Post = ({
  key,
  postId,
  postUserID,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  console.log("post user", postUserID);

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userID: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  return (
    <div className="flex flex-col space-y-4   text-black bg-white p-5 w-96 rounded-xl">
      <Friend
        friendId={postUserID}
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
        <div className="flex p-3 space-x-4  border border-black w-full">
          <div
            className="flex justify-start items-center border border-black space-x-3 cursor-pointer"
            onClick={patchLike}
          >
            <h1>{isLiked ? <FcLike color="red" /> : <FcLikePlaceholder />}</h1>
            <h1>{likeCount}</h1>
          </div>
          <div className="flex space-x-2">
            <button onClick={() => setIsComments(!isComments)}>
              <AiOutlineComment />
            </button>
            <h2>{comments.length}</h2>
          </div>
        </div>
        {isComments && (
          <div className="w-full border border-black">
            <div className="w-full">
              {comments.map((comment, i) => (
                <div key={`${name}-${i}`} className="p-1 w-full">
                  <p>{comment}</p>
                  <br className="w-56 border border-black" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
