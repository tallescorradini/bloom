import Head from "next/head";
import Link from "next/link";
import { Image, Transformation } from "cloudinary-react";
import { useEffect, useState } from "react";

import styles from "./Home.module.scss";
import { getUserGalleries } from "../services/firebase/firebaseDb";
import illustrationGalleries from "../public/illustration-galleries.svg";

const userId = process.env.NEXT_PUBLIC_USER_ID_PLACEHOLDER;
const MAX_GALLERY_THUMBNAILS = 5;

export default function Home() {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  function formatCreatedAt(milisecondsElapsed) {
    const date = new Date(milisecondsElapsed);
    const intlDate = new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "medium",
    }).format(date);
    const formattedDate = intlDate.replace(".", "");

    return `desde ${formattedDate}`;
  }

  const isEmpty = galleries.length === 0;

  useEffect(() => {
    getUserGalleries({ userId, maxThumbnails: MAX_GALLERY_THUMBNAILS }).then(
      (galleries) => {
        setGalleries(galleries);
        setLoading(false);
      }
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
        {!loading && isEmpty ? (
          <div className={styles.emptyGallery}>
            <img src={illustrationGalleries.src} alt="" width="360" />
            <h2 className={styles.title}>Nenhuma galeria disponível</h2>
            <p>Clique no botão pra adicionar sua primeira galeria</p>
          </div>
        ) : (
          <ul className={styles.galleryList}>
            {galleries.map((gallery) => (
              <li key={gallery.id}>
                <Link href={`/${gallery.id}`}>
                  <a>
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
                </Link>
              </li>
            ))}
          </ul>
        )}

        <Link href={`/add-gallery?totalGalleries=${galleries.length}`}>
          <a aria-label="Criar nova galeria" className={styles.fab}>
            <span aria-hidden="true" className="icon xl add"></span>
          </a>
        </Link>
      </main>
    </div>
  );
}
