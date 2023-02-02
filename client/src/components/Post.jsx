import React, { useState } from "react";
import Friend from "./Friend";
import { useDispatch, useSelector } from "react-redux";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { AiOutlineComment } from "react-icons/ai";
import { setPost } from "../state";
import { BASE_URL } from "../../utils/deploy";

const Post = ({
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

  const patchLike = async () => {
    const response = await fetch(
      `${BASE_URL || "http://localhost:3001"}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userID: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <div className="flex flex-col space-y-4   text-black bg-white p-5 w-[350px] md:w-[450px] rounded-xl shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
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
        <div className="">
          {picturePath && (
            <img
              width="100%"
              height="auto"
              src={`${
                BASE_URL || "http://localhost:3001"
              }/assets/${picturePath}`}
              className="rounded-lg"
            />
          )}
        </div>
        <div className="flex p-3 space-x-4  w-full">
          <div
            className="flex justify-start items-center  space-x-3 cursor-pointer"
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
          <div className="w-full">
            <div className="w-full">
              {comments.map((comment, i) => (
                <div key={`${name}-${i}`} className="p-1 w-full">
                  <p>{comment}</p>
                  <br className="w-56 " />
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
