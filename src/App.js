import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Publish from "./pages/Publish";
import Account from "./pages/Account";
import Print from "./pages/Print";
import Story from "./pages/Story";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/audio" element={<Audio />} />
      <Route path="/video" element={<Video />} />
      <Route path="/publish-images" element={<Publish />} />
      <Route path="/publish-videos" element={<Publish />} />
      <Route path="/account" element={<Account />} />
      <Route path="/print" element={<Print />} />
      <Route path="/story" element={<Story />} />
    </Routes>
  );
}

export default App;
