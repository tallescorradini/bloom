import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const storage = getStorage(app);
// const serverTimeStamp = database.firestore.FieldValue.serverTimeStamp;

const getImageId = () => {
  const imageRef = doc(collection(database, "gallery"));

  return imageRef.id;
};

const saveImageToStorage = async (imageFile, imageId, galleryId) => {
  const imageRef = ref(storage, `gallery/${galleryId}/${imageId}`);
  const metadata = { name: imageId };

  await uploadBytes(imageRef, imageFile, metadata);

  return getDownloadURL(imageRef);
};

const saveImageToDatabase = async (imageData, galleryId) => {
  const galleryRef = doc(database, "gallery", galleryId);
  const createdAt = serverTimestamp();
  const imageField = {
    [imageData.id]: {
      path: imageData.path,
      createdAt,
    },
  };

  await updateDoc(galleryRef, imageField);

  return { ...imageData, createdAt };
};

export {
  database,
  storage,
  getImageId,
  saveImageToStorage,
  saveImageToDatabase,
};
