import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby-plugin-react-i18next";
import { GatsbyImage } from "gatsby-plugin-image";

import { composeClasses } from "../../helpers";
import * as styles from "./previewCard.module.scss";

// Bordered card that links (as a whole) to a post or project page.
// Used by the Notes list and the Projects grid.
const PreviewCard = ({ to, language, image, imageAlt = "", className, children }) => (
  <Link
    to={to}
    language={language}
    className={styles.link}
  >
    <article className={composeClasses(styles.card, className)}>
      {image && (
        <GatsbyImage
          image={image}
          alt={imageAlt}
          className={styles.image}
        />
      )}
      <div className={styles.body}>{children}</div>
    </article>
  </Link>
);

PreviewCard.propTypes = {
  to: PropTypes.string.isRequired,
  language: PropTypes.string,
  image: PropTypes.object,
  imageAlt: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default PreviewCard;
