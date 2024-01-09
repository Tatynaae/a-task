import React from "react";
import clsx from "clsx";
import "./Button.scss";

const Button = ({ variant = "default", disabled, text, ...props }) => {
  const VariantStyle = {
    default: "default",
  };
  return <button className={clsx(VariantStyle[variant], disabled && 'disabled')} {...props}>{text}</button>;
};

export default Button;
