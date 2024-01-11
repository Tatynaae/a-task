import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Audio from "./pages/Audio";
import Video from "./pages/Video";
import Account from "./pages/Account";
import Print from "./pages/Print";
import Story from "./pages/Story";
import PublishBookStory from "./pages/Publish/components/PublishBookStory";
import PublishImageStory from "./pages/Publish/components/PublishImageStory";
import PublishVideoStory from "./pages/Publish/components/PublishVideoStory";
import PublishPrintStory from "./pages/Publish/components/PublishPrintStory";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/print" element={<Print />} />
      <Route path="/video" element={<Video />} />
      <Route path="/audio" element={<Audio />} />
      <Route path="/account" element={<Account />} />
      <Route path="/book-story" element={<Story />} />
      <Route path="/publish-images" element={<PublishImageStory />} />
      <Route path="/publish-videos" element={<PublishVideoStory />} />
      <Route path="/publish-book_story" element={<PublishBookStory />} />
      <Route path="/publish-print_story" element={<PublishPrintStory />} />
    </Routes>
  );
}

export default App;
