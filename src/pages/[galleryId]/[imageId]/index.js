import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Image, Placeholder } from "cloudinary-react";

import styles from "./Image.module.scss";
import { getGalleryImage } from "../../../services/firebase/firebaseDb";

export default function GalleryImage() {
  const router = useRouter();
  const { galleryId, imageId } = router.query;
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);

  function formatCreatedAt(milisecondsElapsed) {
    const date = new Date(milisecondsElapsed);
    const intlDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(date);
    const formattedDate = intlDate.replace(".", "");

    return formattedDate;
  }

  useEffect(() => {
    if (!imageId) return;
    getGalleryImage(imageId).then((image) => {
      setImage(image);
    });
  }, [imageId]);

  useEffect(() => {
    if (!image) return;
    setLoading(false);
  }, [image]);

  return (
    <div className={`${"pageWithFixedHeader"} ${styles.page}`}>
      <Head>
        <title>{"Visualizar imagem"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href={`/${galleryId}`}>
          <a aria-label="Voltar para galeria" className={styles.backLink}>
            <span aria-hidden="true" className="icon sm chevronLeft"></span>
          </a>
        </Link>
        <h2 className={styles.title}>
          {image ? formatCreatedAt(image.createdAt) : ""}
        </h2>
      </header>

      <main>
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <Image
            cloudName={process.env.NEXT_PUBLIC_CLOUD_NAME}
            publicId={image.src.cloudinary.publicId}
            version={image.src.cloudinary.version}
            width="100%"
          >
            <Placeholder type="blur" />
          </Image>
        )}
      </main>
    </div>
  );
}
