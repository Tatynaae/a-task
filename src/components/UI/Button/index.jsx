import React from "react";
import "./Button.scss";

const Button = ({ variant = "default", text, ...props }) => {
  const VariantStyle = {
    default: "default",
  };
  return <button className={VariantStyle[variant]} {...props}>{text}</button>;
};

export default Button;
