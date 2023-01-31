import React, { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/deploy";
import Cover from "../assets/final-cover.jpg";

const RegisterFrom = () => {
  const [inputs, setinputs] = useState({});
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const getinputs = (data) => {
    const { value, name } = data.target;
    const input = { [name]: value };
    setinputs({ ...inputs, ...input });
  };

  const register = async (e) => {
    // this allows us to send form info with image
    e.preventDefault();
    try { 
      const formData = new FormData();
      for (let value in inputs) {
        formData.append(value, inputs[value]);
      }
      formData.append("picture", files[0]);
      formData.append("picturePath", files[0].name);
      const savedUserResponse = await fetch(
        `${BASE_URL || 'http://localhost:3001'}/auth/register`,
        {
          method: "POST",
          body: formData,
        }
      );
      const savedUser = await savedUserResponse.json();
      if (savedUser) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error.msg);
    }
  };

  const demo = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let value in inputs) {
      formData.append(value, inputs[value]);
    }
    formData.append("picturePath", files[0].path);
  };
  return (
    <div className="container h-screen mx-auto ">
      <div className="flex justify-center px-6 my-12">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex ">
          <div className="w-full h-full bg-white  hidden  lg:block lg:w-[600px]  rounded-l-lg">
            <img src={Cover} alt="" className="h-full w-full object-contain" />
          </div>

          <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>
            <form
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              onSubmit={register}
            >
              <div className="mb-4 md:flex md:justify-between">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="firstName"
                  >
                    First Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={getinputs}
                  />
                </div>
                <div className="md:ml-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="lastName"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={getinputs}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={getinputs}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  htmlFor="loaction"
                >
                  loaction
                </label>
                <input
                  className="w-full p-1 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="loaction"
                  type="text"
                  placeholder="Enter your location.."
                  name="loacation"
                  onChange={getinputs}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block   text-sm font-bold text-gray-700"
                  htmlFor="occupation"
                >
                  Occupation
                </label>
                <input
                  className="w-full p-1  md:mt-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="occupation"
                  type="text"
                  placeholder="Your occupation.."
                  name="occupation"
                  onChange={getinputs}
                />
              </div>
              <div className="border-dashed border-2 border-sky-500 p-1 cursor-pointer">
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={onDrop}
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} name="picturePath" />
                      <p>Add Your Profile picture</p>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div className="mb-4 md:flex md:justify-between mt-5">
                <div className="mb-4 md:mr-2 md:mb-0">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 borderrounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="******************"
                    name="password"
                    onChange={getinputs}
                  />
                </div>
              </div>
              <div className=" text-center">
                <button
                  className="w-full p-1 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                  type="sumbit"
                >
                  Register Account
                </button>
              </div>
              <hr className=" border-t" />
              <div className="text-center">
                <a
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Login!
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterFrom;
