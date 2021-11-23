import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firebaseStorage } from "./firebaseApp";

export async function saveImage(imageFile, imageId, galleryId) {
  const imageRef = ref(firebaseStorage, `gallery/${galleryId}/${imageId}`);
  const metadata = { name: imageId };

  await uploadBytes(imageRef, imageFile, metadata);

  return { src: await getDownloadURL(imageRef) };
}
