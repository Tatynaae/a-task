import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Publish from "./pages/Publish";
import Account from "./pages/Account";
import Print from "./pages/Print";
import Story from "./pages/Story";
import PublishBookStory from "./pages/Publish/components/PublishBookStory";

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
      <Route path="/book-story" element={<Story />} />
      <Route path="/publish-book_story" element={<PublishBookStory />} />
    </Routes>
  );
}

export default App;
