import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { SignUpProvider } from "./context/SingUpContext";
import { BookStoryProvider } from "./context/BookStoryContext";
import { VideoStoryProvider } from "./context/VideoStoryContext";
import { AudioStoryProvider } from "./context/AudioStoryContext";
import { PrintStoryProvider } from "./context/PrintStoryContext";
import Layout from "./components/Layout";
import App from "./App";
import "./index.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Layout>
      <SignUpProvider>
          <BookStoryProvider>
            <VideoStoryProvider>
              <AudioStoryProvider>
                <PrintStoryProvider>
                  <App />
                </PrintStoryProvider>
              </AudioStoryProvider>
            </VideoStoryProvider>
          </BookStoryProvider>
      </SignUpProvider>
    </Layout>
  </BrowserRouter>
);
reportWebVitals();
