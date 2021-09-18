import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import { Gallery } from "./pages";

const itemData = [
  {
    src: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    src: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    src: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    src: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    src: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    src: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    src: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    src: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    src: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    src: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    src: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    src: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];

// TODO: feat list galleries
// TODO: feat manage galleries

function App() {
  const [images, setImages] = useState(itemData);

  const handleGalleryUpdate = (savedImageData) => {
    console.log("update", savedImageData);
    setImages((prev) => [
      ...prev,
      { src: savedImageData.path, title: savedImageData.id },
    ]);
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/:galleryId">
          <Gallery images={images} onGalleryUpdate={handleGalleryUpdate} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
