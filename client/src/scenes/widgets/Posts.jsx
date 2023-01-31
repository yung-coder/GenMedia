import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../../utils/deploy";
import Post from "../../components/Post";
import { setPosts } from "../../state/index";

const Posts = ({ userId, profilePage, setProfilePage }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const isProfile = profilePage;

  const getPosts = async () => {
    const response = await fetch(`${BASE_URL || 'http://localhost:3001'}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `${BASE_URL || 'http://localhost:3001'}/${userId}/posts`,
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
    <div className="overflow-auto  w-full">
      <div className="flex flex-col justify-center items-center p-16">
        {posts.map((post) => (
          <div className="p-4" key={post._id}>
            <Post
              postId={post._id}
              postUserID={post.userID}
              name={`${post.firstName} ${post.lastName}`}
              description={post.description}
              location={post.location}
              picturePath={post.picturePath}
              userPicturePath={post.userPicturePath}
              likes={post.likes}
              comments={post.comments}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
