import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import UserImage from "../../components/UserImage";
import { AiOutlineFileImage } from "react-icons/ai";
import { BsFileEarmarkImageFill } from "react-icons/bs";
import { setPosts } from "../../state/index";
import { BASE_URL } from "../../../utils/deploy";

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
      formData.append("picture", image[0]);
      formData.append("picturePath", image[0].name);
    }

    const response = await fetch(`${BASE_URL || 'http://localhost:3001'}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  const demo = async () => {

    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image[0].name);
      formData.append("picturePath", image[0].path);
    }


  };

  return (
    <div className="p-5 bg-white rounded-lg flex flex-col space-y-5 w-[340px] md:w-[530px] shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]">
      <div className="flex space-x-4 justify-start items-center p-2">
        <div className="w-24">
          <UserImage image={picturePath} />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="px-2 py-3 placeholder-slate-300 text-slate-600 relative bg-white  rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            onChange={(e) => setPost(e.target.value)}
            value={post}
            placeholder="Whats up....."
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
                <p className="text-black">Add Image</p>
              </div>
            )}
          </Dropzone>
        </div>
      )}
      <div className="flex space-x-3">
        <div
          className="flex space-x-2 items-center hover:bg-blue-600 hover:rounded-lg p-2 cursor-pointer"
          onClick={() => setIsImage(!isImage)}
        >
          <BsFileEarmarkImageFill color="black" />
          <h2 className="text-black">Image</h2>
        </div>
        <div
          className="flex space-x-2 items-center hover:bg-blue-600 hover:rounded-lg p-2 cursor-pointer"
          onClick={handlePost}
        >
          <h2 className="text-black">POST</h2>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
