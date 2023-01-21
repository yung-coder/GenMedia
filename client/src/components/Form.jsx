import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/index";
import Dropzone from "react-dropzone";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialRegisterValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialLoginValue = {
  email: "",
  password: "",
};

const Form = () => {
  const [PageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = PageType === "login";
  const isRegister = PageType === "register";

  const register = async (values, onSumbitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSumbitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSumbitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSumbitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSumbitProps) => {
    if (isLogin) await login(values, onSumbitProps);
    if (isRegister) await register(values, onSumbitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialLoginValue : initialRegisterValue}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSumbit,
        setFieldValue,
        resetFrom,
      }) => (
        <>
          {isLogin && (
            <div className="container mx-auto">
              <div className="flex justify-center px-6 my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"></div>

                  <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
                    <form
                      className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                      onSubmit={handleSumbit}
                    >
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="email"
                          onChange={handleChange}
                          value={values.email}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type="password"
                          onChange={handleChange}
                          placeholder="******************"
                        />
                      </div>
                      <div className="mb-6 text-center">
                        <button
                          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="sumbit"
                        >
                          Sign In
                        </button>
                      </div>
                      <hr className="mb-6 border-t" />
                      <div className="text-center">
                        <a
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                          }}
                        >
                          Create an Account!
                        </a>
                      </div>
                      <div className="text-center">
                        <a
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          href="./forgot-password.html"
                        >
                          Forgot Password?
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isRegister && (
            <div className="container mx-auto h-fit">
              <div className="flex justify-center my-12">
                <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div className="w-full h-full bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"></div>

                  <div className="w-full lg:w-7/12 bg-white  rounded-lg lg:rounded-l-none">
                    <h3 className="pt-4 text-2xl text-center">
                      Create an Account!
                    </h3>
                    <form
                      className="px-3 bg-white rounded"
                      onSubmit={handleSumbit}
                    >
                      <div className="mb-4 md:flex md:justify-between">
                        <div className="">
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
                            onChange={handleChange}
                            value={values.firstName}
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
                            onChange={handleChange}
                            placeholder="Last Name"
                            value={values.lastName}
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
                          onChange={handleChange}
                          value={values.email}
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="location"
                        >
                          Location
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="location"
                          type="text"
                          placeholder="location"
                          onChange={handleChange}
                          value={values.loacation}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block mb-2 text-sm font-bold text-gray-700"
                          htmlFor="occupation"
                        >
                          Occupation
                        </label>
                        <input
                          className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="occupation"
                          type="text"
                          placeholder="occupation"
                          onChange={handleChange}
                          value={values.occupation}
                        />
                      </div>
                      <div className="p-4">
                        <Dropzone
                          acceptedFiles=".jpg,.jpeg,.png"
                          multiple={false}
                          onDrop={(acceptedFiles) =>
                            setFieldValue("picture", acceptedFiles[0])
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} className="border">
                              <input {...getInputProps()} />
                              {!values.picture ? (
                                <p>Add picture here</p>
                              ) : (
                                <div>
                                  <h1>{values.picture.name}</h1>
                                </div>
                              )}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                      <div className="mb-4 md:flex md:justify-between">
                        <div className="mb-4 md:mr-2 md:mb-0">
                          <label
                            className="block mb-2 text-sm font-bold text-gray-700"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            onChange={handleChange}
                            placeholder="******************"
                          />
                        </div>
                      </div>
                      <div className="mb-6 text-center">
                        <button
                          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="sumbit"
                        >
                          Register Account
                        </button>
                      </div>
                      <hr className="mb-6 border-t" />
                      <div className="text-center">
                        <a
                          className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                            resetFrom();
                          }}
                        >
                          Already have an account? Login!
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Formik>
  );
};

export default Form;
