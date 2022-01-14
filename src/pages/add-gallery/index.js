import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";

import styles from "./AddGallery.module.scss";
import printQrIllustration from "../../public/illustration-print-qr.svg";
import { createGallery } from "../../services/firebase/firebaseDb";
import { GalleryPrintTemplate } from "../../components/GalleryPrintTemplate";
import { RadioField } from "../../components/RadioField";

const userId = process.env.NEXT_PUBLIC_USER_ID_PLACEHOLDER;

export default function AddGallery() {
  const {
    query: { totalGalleries },
  } = useRouter();
  const [labelQuantity, setLabelQuanity] = useState(4);
  const [currentStep, setCurrentStep] = useState(0);
  const [printGalleries, setPrintGalleries] = useState([]);
  const printLayout = useRef();

  const handlePrintQrCode = useReactToPrint({
    content: () => printLayout.current,
  });

  function handleLabelQuantityChange(e) {
    setLabelQuanity(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const galleryNames = Array.from(Array(Number(labelQuantity))).map(
      (v, i) => `Flor ${Number(totalGalleries) + 1 + i}`
    );

    await Promise.all(
      galleryNames.map(async (galleryName) => {
        const gallery = await createGallery({ galleryName, userId });
        setPrintGalleries((prev) => [
          ...prev,
          {
            id: gallery.id,
            name: galleryName,
            url: `${process.env.NEXT_PUBLIC_APP_URL}/${gallery.id}`,
          },
        ]);
      })
    );

    setCurrentStep((step) => step + 1);
  }

  function displayStep(currentStep) {
    switch (currentStep) {
      case 0: {
        return (
          <section className={styles.section}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <fieldset>
                <legend className={styles.title}>
                  Quantas flores diferentes gostaria de fotografar?
                </legend>
                {[4, 8, 12].map((quantity) => (
                  <RadioField
                    selectedValue={labelQuantity}
                    onChange={handleLabelQuantityChange}
                    value={quantity}
                    label={`${quantity} flores`}
                    name={`label-quantity`}
                    id={`label-${quantity}`}
                    className={styles.radioField}
                    key={quantity}
                  />
                ))}
              </fieldset>

              <button type="submit" className={styles.buttonPrimary}>
                Continuar
              </button>
            </form>
          </section>
        );
      }

      case 1: {
        return (
          <section className={styles.section}>
            <h1 className={styles.title}>Agora falta só imprimir a etiqueta</h1>
            <div>
              <Image src={printQrIllustration} alt="" layout="responsive" />
            </div>
            <div className={styles.buttonGroup}>
              <button
                onClick={handlePrintQrCode}
                className={styles.buttonPrimary}
              >
                <span aria-hidden="true" className="icon sm qrcode"></span>
                Imprimir agora
              </button>
              <Link href={`/`}>
                <a className={styles.buttonSecondary}>Agora não</a>
              </Link>
            </div>

            <GalleryPrintTemplate
              printGalleries={printGalleries}
              ref={printLayout}
            />
          </section>
        );
      }

      default: {
        return null;
      }
    }
  }

  return (
    <div className="pageWithFixedHeader">
      <Head>
        <title>{"Nova Galeria"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <Link href="/">
          <a aria-label="Cancelar" className={styles.backLink}>
            <span aria-hidden="true" className="icon sm close"></span>
          </a>
        </Link>
      </header>
      <main>{displayStep(currentStep)}</main>
    </div>
  );
}
