import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "../../components/UserImage";
import { AiOutlineFileImage } from "react-icons/ai";
import { setPosts } from "../../state/index";

const PostInput = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const { _id } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const onDrop = useCallback((acceptedFiles) => {
    setImage(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userID", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picturePath", image[0].path);
    }

    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  console.log(user);

  const demo = async () => {
    console.log(image);
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picturePath", image[0].path);
    }

    console.log(formData);
  };

  return (
    <div className="p-5 bg-white rounded-lg flex flex-col space-y-5">
      <div className="flex space-x-4 justify-start items-center p-2">
        <div className="w-24">
          <UserImage image={picturePath} />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={(e) => setPost(e.target.value)}
            value={post}
          />
        </div>
      </div>
      {isImage && (
        <div className="border-dashed border-2 border-sky-500 p-2 cursor-pointer">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={onDrop}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} name="picturePath" />
                <p className="text-black">Add image</p>
              </div>
            )}
          </Dropzone>
        </div>
      )}
      <div className="flex">
        <div
          className="flex space-x-2 items-center hover:bg-sky-500 hover:rounded-lg p-2 cursor-pointer"
          onClick={() => setIsImage(!isImage)}
        >
          <AiOutlineFileImage color="black" />
          <h2 className="text-black">Image</h2>
        </div>
        <div
          className="flex space-x-2 items-center hover:bg-sky-500 hover:rounded-lg p-2 cursor-pointer"
          onClick={handlePost}
        >
          <h2 className="text-black">POST</h2>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
