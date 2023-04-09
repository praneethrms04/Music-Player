import React from "react";

const Loader = () => {
  return (
    <div
      className="inline-block ms-24 mt-24 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    ></div>
  );
};

export default Loader;
