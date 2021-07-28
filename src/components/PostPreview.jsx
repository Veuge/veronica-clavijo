import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export default function PostPreview() {
  return (
    <article>
      <h1>{"{Blog title}"}</h1>
      <h3>{"{Summary}"}</h3>
      <span>{"{date}"}</span>
      <FontAwesomeIcon icon={faEllipsisV} />
      <div>{"{tag}"}</div>
      <div>{"{tag}"}</div>
      <div>{"{tag}"}</div>
    </article>
  );
}
