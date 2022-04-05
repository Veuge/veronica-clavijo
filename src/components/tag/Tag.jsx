import React from "react";
import * as styles from "./tag.module.scss";

const Tag = (props) => {
  return (
    <div className={styles.tag}>
      {props.tag}
    </div>
  );
}

export default Tag;
