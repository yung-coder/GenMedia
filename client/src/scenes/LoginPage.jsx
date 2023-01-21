import React from "react";
import Form from "../components/Form";

const index = () => {
  return (
    <>
      <div className="bg-slate-300 flex justify-center items-center p-1">
        <h1 className="text-2xl font-bold text-black tracking-widest">
          GenPedia
        </h1>
      </div>
      <div className="mt-16">
        <Form />
      </div>
    </>
  );
};

export default index;
