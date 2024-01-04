import React from "react";
import { Route, Routes } from "react-router-dom";
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Publish from "./pages/Publish";
import Account from "./pages/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Audio />} />
      <Route path="/video" element={<Video />} />
      <Route path="/publish" element={<Publish />} />
      <Route path="/account" element={<Account />} />
    </Routes>
  );
}

export default App;
