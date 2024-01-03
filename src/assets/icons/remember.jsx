import React from "react";

const Remember = ({ checked }) => {
  return (
    <svg
      style={{
        cursor: "pointer",
      }}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" rx="4" fill={"#2C6DA3"} />
      <path
        d="M5 10.0001L8.33333 13.3334L15 6.66675"
        stroke={checked ? "white" : ''}
        stroke-width="2.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Remember;
