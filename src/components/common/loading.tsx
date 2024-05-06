import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="spinner inline-block w-[50px] h-[50px] border-[3px] border-[rgba(195,195,195,0.6)] rounded-[50%] border-t-[#636767] " />
    </div>
  );
};

export default Loading;
