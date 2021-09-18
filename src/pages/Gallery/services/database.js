import {
  getImageId,
  saveImageToStorage,
  saveImageToDatabase,
} from "../../../services/firebase";

const saveImage = async (loadedImage, galleryId) => {
  const imageId = getImageId();
  const imageStoragePath = await saveImageToStorage(
    loadedImage,
    imageId,
    galleryId
  );

  const imageData = {
    id: imageId,
    path: imageStoragePath,
    // modifiedAt: loadedImage.lastModified,
  };
  const savedImageData = await saveImageToDatabase(imageData, galleryId);

  return savedImageData;
};

const gallery = {
  saveImage,
};

export default gallery;
