import React from "react";
import Header from "../Header";
import { SignUpProvider } from "../../context/SingUpContext";

const Layout = ({ children }) => {
  return (
    <>
      <SignUpProvider>
        <Header />
      </SignUpProvider>
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
