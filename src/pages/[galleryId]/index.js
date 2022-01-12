import Head from "next/head";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Image, Transformation } from "cloudinary-react";

import styles from "./Gallery.module.scss";
import { ImageInput } from "../../components/ImageInput/ImageInput";
import { database } from "../../services";
import { encodeImage } from "../../utils/encodeImage";

export default function Gallery() {
  const router = useRouter();
  const [gallery, setGallery] = useState({});
  const [galleryNotFound, setGalleryNotFound] = useState(false);
  const { galleryId } = router.query;

  async function uploadImage(imageId, imageFile, galleryId) {
    const base64EncodedImage = await encodeImage(imageFile);

    const { data: storedImageData } = await axios.post(
      `/api/${galleryId}/image`,
      { encodedImage: base64EncodedImage, imageId: imageId },
      { headers: { "Content-Type": "application/json" } }
    );

    const savedImageData = await database.saveImage({
      id: imageId,
      src: storedImageData,
      galleryId: galleryId,
    });

    return savedImageData;
  }

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    if (!imageFile) return;
    const imageId = database.makeImageId();
    try {
      const savedImageData = await uploadImage(imageId, imageFile, galleryId);
      setGallery((prev) => ({
        ...prev,
        images: [
          ...prev.images,
          { src: savedImageData.src, id: savedImageData.id },
        ],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const galleryHasImages = () => {
    return gallery.images?.length > 0;
  };

  useEffect(() => {
    if (!galleryId) return;
    database.getGallery(galleryId).then((gallery) => {
      if (!gallery) return setGalleryNotFound(true);
      setGallery(gallery);
    });
  }, [galleryId]);

  return (
    <>
      {galleryNotFound ? (
        <h1>Oops, we could not find this gallery.</h1>
      ) : (
        <div className="pageWithFixedHeader">
          <Head>
            <title>{"QR-Drive"}</title>
            <meta
              name="description"
              content={"Easily access your media using QR Codes"}
            />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <header className={styles.header}>
            <Link href="/">
              <a href="/" aria-label="Voltar" className={styles.backLink}>
                <span aria-hidden="true" className="icon sm chevronLeft"></span>
              </a>
            </Link>

            <h1 className={styles.title}>{gallery.name || "Galeria"}</h1>

            <button aria-label="Mais opções" className={styles.moreButton}>
              <span aria-hidden="true" className="icon sm moreVertical"></span>
            </button>
          </header>

          <main>
            {galleryHasImages() ? (
              <ul className={styles.imageList}>
                {gallery.images.map((image) => (
                  <li key={image.id}>
                    <Image
                      cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
                      publicId={image.src.cloudinary.publicId}
                      version={image.src.cloudinary.version}
                      loading="lazy"
                    >
                      <Transformation
                        gravity="auto"
                        height="150"
                        width="150"
                        crop="fill"
                      />
                    </Image>
                  </li>
                ))}
              </ul>
            ) : (
              <p>{`Nenhuma imagem na galeria`}</p>
            )}
          </main>

          <ImageInput onImageChange={handleImageChange} />
        </div>
      )}
    </>
  );
}
