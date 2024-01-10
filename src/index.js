import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ImagesProvider } from "./context/ImagesContext";
import { SourseProvider } from "./context/SourseContext";
import { SignUpProvider } from "./context/SingUpContext";
import { BookStoryProvider } from "./context/BookStoryContext";
import Layout from "./components/Layout";
import App from "./App";
import "./index.scss";
import { VideoStoryProvider } from "./context/VideoStoryContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Layout>
      <SignUpProvider>
        <ImagesProvider>
          <SourseProvider>
            <BookStoryProvider>
              <VideoStoryProvider>
                <App />
              </VideoStoryProvider>
            </BookStoryProvider>
          </SourseProvider>
        </ImagesProvider>
      </SignUpProvider>
    </Layout>
  </BrowserRouter>
);
reportWebVitals();
