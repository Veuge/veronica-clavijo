import React from "react";
import * as styles from "../styles/tags.module.scss";

export function Tag(props) {
  return (
    <div className={styles.tag}>
      {props.tag}
    </div>
  );
}
