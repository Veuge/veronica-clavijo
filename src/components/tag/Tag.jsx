import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby-plugin-react-i18next";

import { composeClasses } from "../../helpers";
import * as styles from "./tag.module.scss";

export const tagFilterPath = (tag) => (tag ? `/posts/?tag=${encodeURIComponent(tag)}` : "/posts/");

// Renders a link to the posts list filtered by this tag when `linked`, otherwise plain text
// (e.g. inside a post card, which is already a link).
const Tag = ({ tag, linked = false, active = false, children }) => {
  const className = composeClasses(styles.tag, active ? styles.active : "");
  const content = children || tag;

  if (!linked) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link
      to={tagFilterPath(tag)}
      className={composeClasses(className, styles.link)}
      aria-current={active ? "true" : undefined}
    >
      {content}
    </Link>
  );
};

Tag.propTypes = {
  tag: PropTypes.string,
  linked: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default Tag;
