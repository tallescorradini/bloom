import {
  collection,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  documentId,
} from "firebase/firestore";

import { firebaseDatabase as db } from "./firebaseApp";

export function makeImageId() {
  const imageRef = doc(collection(db, "images"));

  return imageRef.id;
}

export async function saveImage(imageData) {
  const { id, src, galleryId } = imageData;
  const createdAt = Date.now();

  await setDoc(doc(db, "images", id), {
    src,
    galleryId,
    createdAt,
  });

  return { ...imageData, createdAt };
}

export async function getGallery(galleryId) {
  const gallery = await getDoc(doc(db, "galleries", galleryId));
  if (!gallery.exists()) return null;

  const images = (
    await getDocs(
      query(
        collection(db, "images"),
        where("galleryId", "==", galleryId),
        orderBy("createdAt", "asc")
      )
    )
  ).docs.map((image) => ({ id: image.id, ...image.data() }));

  return { ...gallery.data(), images };
}

export async function getUserGalleries({ userId, maxThumbnails }) {
  if (!userId) return [];
  const galleries = await Promise.all(
    (
      await getDocs(
        query(
          collection(db, "galleries"),
          where("userId", "==", userId),
          orderBy("createdAt", "asc")
        )
      )
    ).docs.map(async (gallery) => {
      const images = (
        await getDocs(
          query(
            collection(db, "images"),
            where("galleryId", "==", gallery.id),
            orderBy("createdAt", "asc"),
            limit(maxThumbnails)
          )
        )
      ).docs.map((image) => ({ id: image.id, ...image.data() }));

      return { id: gallery.id, ...gallery.data(), images };
    })
  );

  return galleries;
}

export async function createGallery({ galleryName, userId }) {
  const createdAt = Date.now();
  const galleryData = {
    name: galleryName,
    userId,
    createdAt,
  };
  const galleryRef = await addDoc(collection(db, "galleries"), galleryData);
  return { id: galleryRef.id, ...galleryData };
}

export async function updateGallery({ galleryId, data }) {
  await setDoc(
    doc(db, "galleries", galleryId),
    { createdAt: data.createdAt, name: data.name, userId: data.userId },
    { merge: true }
  );
}

export async function deleteGallery({ galleryId, galleryImages }) {
  await deleteDoc(doc(db, "galleries", galleryId));
  await Promise.all(
    galleryImages.map(async (image) => {
      await deleteDoc(doc(db, "images", image.id));
    })
  );
}

export async function getGalleryImage(imageId) {
  const image = await getDoc(doc(db, "images", imageId));
  if (!image.exists()) return null;

  return image.data();
}

export async function deleteImage(imageId) {
  await deleteDoc(doc(db, "images", imageId));
}
