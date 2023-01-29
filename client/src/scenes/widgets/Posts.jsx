import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "../../components/Post";
import { setPosts } from "../../state/index";

const Posts = ({ userID, profilePage, setProfilePage }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const isProfile = profilePage;

  const getPosts = async () => {
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userID}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);
  return (
    <div className="overflow-auto">
      <div className="flex flex-col justify-center items-center p-5">
        {posts.map(
          ({
            _id,
            userID,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            comments,
          }) => (
            <>
              <div className="p-3">
                <Post
                  key={_id}
                  postId={_id}
                  postUserId={userID}
                  name={`${firstName} ${lastName}`}
                  description={description}
                  location={location}
                  picturePath={picturePath}
                  userPicturePath={userPicturePath}
                  likes={likes}
                  comments={comments}
                />
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Posts;
