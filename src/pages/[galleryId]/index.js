import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";

import { database, storage } from "../../services";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});
// TODO: [x] feat add new photo
// TODO: [x] feat update list when photo is added
// TODO: [x] feat list gallery images
// TODO: [x] fix create an empty list state
// TODO: [ ] feat use image compressing for faster loading
// TODO: [ ] feat view photo
// TODO: [ ] feat delete photo
// TODO: [ ] feat rename gallery name

export default function Gallery() {
  const imageInputRef = useRef();
  const router = useRouter();
  const [images, setImages] = useState([]);
  const { galleryId } = router.query;

  const handleImageChange = async (event) => {
    const loadedImage = event.target.files[0];
    if (!loadedImage) return;

    const imageId = database.makeImageId();
    const { src } = await storage.saveImage(loadedImage, imageId, galleryId);

    const savedImageData = await database.saveImage({
      id: imageId,
      src: src,
      galleryId: galleryId,
    });

    setImages((prev) => [
      ...prev,
      { src: savedImageData.src, title: savedImageData.id },
    ]);
  };

  const isEmptyList = () => {
    return images.length > 0;
  };

  useEffect(() => {
    if (!galleryId) return;
    database.getGallery(galleryId).then((images) => {
      setImages(
        Object.keys(images).map((id) => ({ src: images[id].src, title: id }))
      );
    });
  }, [galleryId]);

  return (
    <>
      <Head>
        <title>{"QR-Drive"}</title>
        <meta
          name="description"
          content={"Easily access your media using QR Codes"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">{`Meu álbum`}</Typography>
        </Toolbar>
      </AppBar>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
        ref={imageInputRef}
        accept="image/x-png,image/jpeg"
      />

      {!isEmptyList ? (
        <Typography variant="body1">{`Nenhuma imagem na galeria`}</Typography>
      ) : (
        <Box>
          <ImageList cols={3} gap={8}>
            {images.map((item) => (
              <ImageListItem key={item.src}>
                <img
                  src={`${item.src}?w=248&fit=crop&auto=format`}
                  srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
      )}

      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <StyledFab color="secondary" aria-label="add">
            <AddIcon
              onClick={() => {
                imageInputRef.current.click();
              }}
            />
          </StyledFab>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
    </>
  );
}
