import React from "react";
import Image from "next/image";

import styles from "./GalleryPrintTemplate.module.scss";
import printLabelIllustration from "../../public/illustration-plant-label.svg";
import { QRCodeCanvas } from "./QRCodeCanvas";

const QR_CODE_SIZES = [50 + 8, 75 + 8, 100 + 8];

export const GalleryPrintTemplate = React.forwardRef(
  ({ printGalleries = [], copy = false }, ref) => {
    const isPlural = printGalleries.length > 1;
    return (
      <div style={{ display: "none" }}>
        <div ref={ref} className={styles.page}>
          <h1 className={styles.title}>
            {copy
              ? isPlural
                ? "Novas cópias de etiqueta disponíveis!"
                : "Nova cópia de etiqueta disponível!"
              : isPlural
              ? "Novas galerias disponíves para suas flores!"
              : "Nova galeria disponível para sua flor!"}
          </h1>

          <div className={styles.instructions}>
            <div className={styles.illustration}>
              <img
                src={printLabelIllustration.src}
                alt="Mulher posicionando etiqueta próximo à flor"
              />
            </div>
            <ul className={styles.instructionList}>
              <li>Recorte um dos tamanhos de etiqueta disponíveis</li>
              <li>
                Posicione próximo à flor{" "}
                <strong>pra acessar quando quiser!</strong>
              </li>
            </ul>
          </div>

          <ul className={styles.galleryList}>
            {printGalleries.map((gallery) => (
              <li key={gallery.id}>
                <div className={styles.galleryItem}>
                  <section>
                    <h2 className={styles.title}>Etiquetas</h2>

                    <ul className={styles.qrCodeList}>
                      {QR_CODE_SIZES.map((size) => (
                        <li key={size}>
                          <span
                            aria-hidden="true"
                            className="icon xs cutHere"
                          ></span>

                          <QRCodeCanvas text={gallery.url} width={size} />
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h2 className={styles.title}>Nome</h2>

                    <p>{gallery.name}</p>
                  </section>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);
