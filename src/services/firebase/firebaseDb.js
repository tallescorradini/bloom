import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

import { firebaseDatabase } from "./firebaseApp";

export function makeImageId() {
  const imageRef = doc(collection(firebaseDatabase, "gallery"));

  return imageRef.id;
}

export async function saveImage(imageData) {
  const { id, src, galleryId } = imageData;

  const galleryRef = doc(firebaseDatabase, "gallery", galleryId);
  const createdAt = serverTimestamp();
  const imageField = {
    [id]: {
      src: src,
      createdAt,
      galleryId,
    },
  };

  await updateDoc(galleryRef, imageField);

  // serverTimestamp does not return a date string, but an instance to be run on the server
  return { ...imageData, createdAt: Date() };
}

export async function getGallery(galleryId) {
  const docRef = doc(firebaseDatabase, "gallery", galleryId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) return docSnap.data();
}
