import React from "react";
import PropTypes from "prop-types";

import { composeClasses } from "../../helpers";
import * as styles from "./detailsList.module.scss";

// Term/description list (whoami "What do I use?", project details).
// Items without a description are skipped so no empty rows are rendered.
const DetailsList = ({ items, className }) => {
  const visibleItems = items.filter(({ description }) => Boolean(description));
  if (visibleItems.length === 0) return null;

  return (
    <dl className={composeClasses(styles.list, className)}>
      {visibleItems.map(({ term, description }, index) => (
        <React.Fragment key={index}>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
};

DetailsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      term: PropTypes.node.isRequired,
      description: PropTypes.node,
    })
  ).isRequired,
  className: PropTypes.string,
};

export default DetailsList;
