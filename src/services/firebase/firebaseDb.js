import {
  collection,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { firebaseDatabase as db } from "./firebaseApp";

export function makeImageId() {
  const imageRef = doc(collection(db, "images"));

  return imageRef.id;
}

export async function saveImage(imageData) {
  const { id, src, galleryId } = imageData;

  await setDoc(doc(db, "images", id), {
    src,
    galleryId,
    createdAt: Date(),
  });

  return { ...imageData, createdAt: Date() };
}

export async function getGallery(galleryId) {
  const gallery = await getDoc(doc(db, "galleries", galleryId));
  if (!gallery.exists()) return null;

  const images = (
    await getDocs(
      query(collection(db, "images"), where("galleryId", "==", galleryId))
    )
  ).docs.map((image) => ({ id: image.id, ...image.data() }));

  return { ...gallery.data(), images };
}
