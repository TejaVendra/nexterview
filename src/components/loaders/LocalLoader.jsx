import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

function LocalLoader({
  size = 20,
  className = "",
  containerClassName = "",
}) {
  return (
    <div className={`flex items-center justify-center ${containerClassName}`}>
      <BiLoaderCircle
        size={size}
        className={`animate-spin ${className}`}
      />
    </div>
  );
}

export default LocalLoader;