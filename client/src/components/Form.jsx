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
            <div class="container mx-auto">
              <div class="flex justify-center px-6 my-12">
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div class="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"></div>

                  <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center">Welcome Back!</h3>
                    <form
                      class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                      onSubmit={handleSumbit}
                    >
                      <div class="mb-4">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlfor="email"
                        >
                          Email
                        </label>
                        <input
                          class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Username"
                          onChange={handleChange}
                          value={values.email}
                          error={
                            Boolean(touched.email) && Boolean(errors.email)
                          }
                        
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlfor="password"
                        >
                          Password
                        </label>
                        <input
                          class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="password"
                          type="password"
                          onChange={handleChange}
                          error={
                            Boolean(touched.password) &&
                            Boolean(errors.password)
                          }
                          placeholder="******************"
                        />
                      </div>
                      <div class="mb-6 text-center">
                        <button
                          class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="sumbit"
                        >
                          Sign In
                        </button>
                      </div>
                      <hr class="mb-6 border-t" />
                      <div class="text-center">
                        <a
                          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                          onClick={() => {
                            setPageType(isLogin ? "register" : "login");
                          }}
                        >
                          Create an Account!
                        </a>
                      </div>
                      <div class="text-center">
                        <a
                          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
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
            <div class="container mx-auto h-fit">
              <div class="flex justify-center my-12">
                <div class="w-full xl:w-3/4 lg:w-11/12 flex">
                  <div class="w-full h-full bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"></div>

                  <div class="w-full lg:w-7/12 bg-white  rounded-lg lg:rounded-l-none">
                    <h3 class="pt-4 text-2xl text-center">
                      Create an Account!
                    </h3>
                    <form class="px-3 bg-white rounded" onSubmit={handleSumbit}>
                      <div class="mb-4 md:flex md:justify-between">
                        <div class="">
                          <label
                            class="block mb-2 text-sm font-bold text-gray-700"
                            htmlfor="firstName"
                          >
                            First Name
                          </label>
                          <input
                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                            onChange={handleChange}
                            value={values.firstName}
                            error={
                              Boolean(touched.firstName) &&
                              Boolean(errors.firstName)
                            }
                          />
                        </div>
                        <div class="md:ml-2">
                          <label
                            class="block mb-2 text-sm font-bold text-gray-700"
                            htmlfor="lastName"
                          >
                            Last Name
                          </label>
                          <input
                            class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            onChange={handleChange}
                            placeholder="Last Name"
                            error={
                              Boolean(touched.lastName) &&
                              Boolean(errors.lastName)
                            }
                            
                            value={values.lastName}
                          />
                        </div>
                      </div>
                      <div class="mb-4">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlfor="email"
                        >
                          Email
                        </label>
                        <input
                          class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="email"
                          onChange={handleChange}
                          value={values.email}
                          error={
                            Boolean(touched.email) && Boolean(errors.email)
                          }
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlfor="location"
                        >
                          Location
                        </label>
                        <input
                          class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="location"
                          type="text"
                          placeholder="location"
                          onChange={handleChange}
                          value={values.loacation}
                          error={
                            Boolean(touched.loacation) &&
                            Boolean(errors.loacation)
                          }
                        />
                      </div>
                      <div class="mb-4">
                        <label
                          class="block mb-2 text-sm font-bold text-gray-700"
                          htmlfor="occupation"
                        >
                          Occupation
                        </label>
                        <input
                          class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                          id="occupation"
                          type="text"
                          placeholder="occupation"
                          onChange={handleChange}
                          value={values.occupation}
                          error={
                            Boolean(touched.occupation) &&
                            Boolean(errors.occupation)
                          }
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
                      <div class="mb-4 md:flex md:justify-between">
                        <div class="mb-4 md:mr-2 md:mb-0">
                          <label
                            class="block mb-2 text-sm font-bold text-gray-700"
                            htmlfor="password"
                          >
                            Password
                          </label>
                          <input
                            class="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            onChange={handleChange}
                            error={
                              Boolean(touched.password) &&
                              Boolean(errors.password)
                            }
                            placeholder="******************"
                          />
                        </div>
                      </div>
                      <div class="mb-6 text-center">
                        <button
                          class="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                          type="sumbit"
                        >
                          Register Account
                        </button>
                      </div>
                      <hr class="mb-6 border-t" />
                      <div class="text-center">
                        <a
                          class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
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
