import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "gatsby-plugin-react-i18next";

import * as styles from "./imageLightbox.module.scss";

// gatsby-remark-images wraps each image in a link to the full-size file.
const IMAGE_LINK_SELECTOR = "a.gatsby-resp-image-link";

// Finds the image (and its best full-size source) behind a click inside the post.
const getClickedImage = (target, container) => {
  const imageLink = target.closest(IMAGE_LINK_SELECTOR);
  if (imageLink && container.contains(imageLink)) {
    const img = imageLink.querySelector("img");
    return { src: imageLink.href, alt: img?.alt || "" };
  }

  // Images not processed by gatsby-remark-images (e.g. GIFs) render as a plain <img>.
  // Leave images that are inside a regular link alone: the link should win.
  if (target.tagName === "IMG" && !target.closest("a") && container.contains(target)) {
    return { src: target.currentSrc || target.src, alt: target.alt || "" };
  }

  return null;
};

/**
 * Opens images from the post body in a full-screen overlay instead of a new tab.
 * Listens to clicks inside `containerRef` (event delegation), so it works for any
 * image the MDX content renders.
 */
const ImageLightbox = ({ containerRef }) => {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const [image, setImage] = useState(null);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    container.classList.add(styles.zoomable);

    const onClick = (event) => {
      // Keep the browser's behaviour for "open in new tab" style clicks.
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const clicked = getClickedImage(event.target, container);
      if (!clicked) return;

      event.preventDefault();
      setImage(clicked);
    };

    container.addEventListener("click", onClick);
    return () => {
      container.removeEventListener("click", onClick);
      container.classList.remove(styles.zoomable);
    };
  }, [containerRef]);

  // Open the modal once the image is in the DOM; lock page scroll while it's open.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!image || !dialog) return undefined;

    if (!dialog.open) dialog.showModal();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = overflow;
    };
  }, [image]);

  return (
    // Clicking anywhere is a mouse shortcut; keyboard users close with Esc (native
    // <dialog> behaviour) or the close button, so no extra key handler is needed.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-label={image?.alt || t("image_viewer")}
      // Fired by Esc, the close button and backdrop clicks alike.
      onClose={() => setImage(null)}
      // Any click on the overlay (image included) closes it, like Medium.
      onClick={close}
    >
      {image && (
        <figure className={styles.figure}>
          <img
            src={image.src}
            alt={image.alt}
            className={styles.image}
          />
          {image.alt && <figcaption className={styles.caption}>{image.alt}</figcaption>}
        </figure>
      )}
      <button
        type="button"
        className={styles.closeButton}
        onClick={close}
        aria-label={t("close")}
      >
        <span aria-hidden="true">×</span>
      </button>
    </dialog>
  );
};

ImageLightbox.propTypes = {
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Object) }).isRequired,
};

export default ImageLightbox;
