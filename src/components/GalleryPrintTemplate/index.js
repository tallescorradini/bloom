import React from "react";
import Image from "next/image";

import styles from "./GalleryPrintTemplate.module.scss";
import printLabelIllustration from "../../public/illustration-plant-label.svg";
import { QRCodeCanvas } from "./QRCodeCanvas";

const ONE_AND_HALF_CENTIMETER_IN_PX = 55;

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

          <ul className={styles.galleryList}>
            {printGalleries.map((gallery) => (
              <li key={gallery.id}>
                <span className={styles.title}>{gallery.name}</span>
                <div className={styles.qrCode}>
                  <QRCodeCanvas
                    text={gallery.url}
                    width={ONE_AND_HALF_CENTIMETER_IN_PX}
                  />
                </div>

                <div className={styles.qrCode}>
                  <QRCodeCanvas
                    text={gallery.url}
                    width={ONE_AND_HALF_CENTIMETER_IN_PX}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);
