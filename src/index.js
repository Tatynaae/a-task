import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ImagesProvider } from "./context/ImagesContext";
import { SourseProvider } from "./context/SourseContext";
import Layout from "./components/Layout";
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Layout>
      <ImagesProvider>
        <SourseProvider>
          <App />
        </SourseProvider>
      </ImagesProvider>
    </Layout>
  </BrowserRouter>
);
reportWebVitals();
