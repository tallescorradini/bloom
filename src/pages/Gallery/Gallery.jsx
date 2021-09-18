import React, { useRef } from "react";
import { useParams } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";

import services from "./services";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});
// TODO (must): [x] feat add new photo
// TODO (must): [ ] feat update list when photo is added
// TODO (must): [ ] feat list gallery images
// TODO (must): [ ] feat view photo
// TODO (must): [ ] feat delete photo
// TODO (must): [ ] feat rename gallery name

const Gallery = ({ images, onGalleryUpdate }) => {
  const imageInputRef = useRef();
  const { galleryId } = useParams();

  const handleImageChange = async (event) => {
    const loadedImage = event.target.files[0];
    if (!loadedImage) return;
    const savedImageData = await services.gallery.saveImage(
      loadedImage,
      galleryId
    );

    onGalleryUpdate(savedImageData);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">{`Coleção ${galleryId}`}</Typography>
        </Toolbar>
      </AppBar>
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleImageChange}
        ref={imageInputRef}
        accept="image/x-png,image/jpeg"
      />

      <Box>
        <ImageList variant="masonry" cols={3} gap={8}>
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
};

export default Gallery;
