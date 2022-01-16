import { useState } from "react";
import { DrawerBottom } from "../DrawerBottom/DrawerBottom";
import { Header } from "../Header/Header";
import { DeleteGallery } from "../DeleteGallery/DeleteGallery";
import { EditGalleryName } from "../EditGalleryName/EditGalleryName";
import styles from "./EditGalleryDrawer.module.scss";

export function EditGalleryDrawer({
  open,
  onClose,
  galleryName,
  onGalleryNameChange,
  onDeleteGallery,
}) {
  if (!open) return null;

  const [navigationStack, setNavigationStack] = useState([]);

  const currentScreenId = navigationStack.slice(-1)[0];

  function handleReturn() {
    setNavigationStack((prev) => prev.slice(0, -1));
  }

  function handleNavigate(nextScreenId) {
    setNavigationStack((prev) => [...prev, nextScreenId]);
  }

  function handleClose() {
    setNavigationStack([]);
    onClose();
  }

  function displayScreen(screenId) {
    switch (screenId) {
      case "EDIT_GALLERY_NAME":
        return (
          <>
            <Header title={"Editar nome"} onReturn={handleReturn} />
            <EditGalleryName
              galleryName={galleryName}
              onGalleryNameChange={onGalleryNameChange}
              onNavigate={handleNavigate}
              onReturn={handleReturn}
            />
          </>
        );
      case "DELETE_GALLERY":
        return (
          <>
            <Header title={"Deletar galeria"} onReturn={handleReturn} />
            <DeleteGallery onDeleteGallery={onDeleteGallery} />
          </>
        );

      default:
        return (
          <>
            <Header title={"Editar galeria"} onClose={handleClose} />
            <ul>
              <li>
                <button
                  onClick={() => handleNavigate("EDIT_GALLERY_NAME")}
                  className={styles.buttonPrimary}
                >
                  <span aria-hidden="true" className="icon sm-md fonts"></span>
                  Editar nome
                  <span
                    aria-hidden="true"
                    className="icon xs chevronRight"
                  ></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigate("DELETE_GALLERY")}
                  className={`${styles.buttonPrimary} ${styles.attention}`}
                >
                  <span aria-hidden="true" className="icon sm-md trash"></span>
                  Excluir galeria
                </button>
              </li>
            </ul>
          </>
        );
    }
  }

  return (
    <DrawerBottom open={open} onClose={handleClose}>
      {displayScreen(currentScreenId)}
    </DrawerBottom>
  );
}
