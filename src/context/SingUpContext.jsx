import React, { createContext, useState, useContext } from "react";

const SignUpContext = createContext();

export const useSignUp = () => {
  return useContext(SignUpContext);
};

export const SignUpProvider = ({ children }) => {
  const [signup, setSignup] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  return (
    <SignUpContext.Provider value={{ signup, setSignup, login, setLogin }}>
      {children}
    </SignUpContext.Provider>
  );
};
