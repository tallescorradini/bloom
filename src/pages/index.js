import Head from "next/head";
import { Image, Transformation } from "cloudinary-react";
import { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import { getUserGalleries } from "../services/firebase/firebaseDb";

const userId = process.env.NEXT_PUBLIC_USER_ID_PLACEHOLDER;
const MAX_GALLERY_THUMBNAILS = 5;

export default function Home() {
  const [galleries, setGalleries] = useState([]);

  function formatCreatedAt(milisecondsElapsed) {
    const date = new Date(milisecondsElapsed);
    const intlDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(date);
    const formattedDate = intlDate.replace(".", "");

    return `desde ${formattedDate}`;
  }

  useEffect(() => {
    getUserGalleries({ userId, maxThumbnails: MAX_GALLERY_THUMBNAILS }).then(
      (galleries) => setGalleries(galleries)
    );
  }, []);

  return (
    <div className="pageWithFixedHeader">
      <Head>
        <title>{"Minhas Galerias"}</title>
      </Head>

      <header>
        <h1 className={styles.headerTitle}>Minhas Galerias</h1>
      </header>

      <main>
        <ul className={styles.galleryList}>
          {galleries.map((gallery) => (
            <li key={gallery.id}>
              <a href={`/${gallery.id}`}>
                <section className={styles.gallery}>
                  <header>
                    <h2 className={styles.title}>{gallery.name}</h2>
                    <h3 className={styles.createdAtDate}>
                      {formatCreatedAt(gallery.createdAt)}
                    </h3>
                    <span className={styles.accessLink} aria-hidden="true">
                      <span
                        aria-hidden="true"
                        className="icon xs chevronRight"
                      ></span>
                      Ver
                    </span>
                  </header>

                  <ul className={styles.thumbnailList}>
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
                    {Array.from(
                      Array(MAX_GALLERY_THUMBNAILS - gallery.images.length)
                    ).map((v, i) => (
                      <li key={i}></li>
                    ))}
                  </ul>
                </section>
              </a>
            </li>
          ))}
        </ul>

        <a href="#" aria-label="Criar nova galeria" className={styles.fab}>
          <span aria-hidden="true" className="icon xl add"></span>
        </a>
      </main>
    </div>
  );
}
