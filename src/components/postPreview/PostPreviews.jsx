import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Tag from "../tag/Tag";
import * as styles from "./postpreviews.module.scss";

export default function PostPreview() {
  const { allMdx } = useStaticQuery(graphql`
    query PostPreviews {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
              date(formatString: "D MMMM YYYY", locale: "es")
              description
              tags
            }
            slug
          }
        }
      }
    }
  `);

  return (
    <div className={styles.postPreviews}>
      {allMdx.edges.map(({ node }) => (
        <Link
          to={node.slug}
          key={node.slug}
        >
          <article
            className={styles.postPreviewContainer}
            key={node.fileAbsolutePath}
          >
            <h1>{node.frontmatter.title}</h1>
            <h3>{node.frontmatter.description}</h3>
            <div className={styles.footerContainer}>
              <span>{node.frontmatter.date}</span>
              {!!node.frontmatter.tags && (
                <>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className={styles.separatorIcon}
                  />
                  {node.frontmatter.tags.map((tag) => (
                    <Tag
                      key={tag}
                      tag={tag}
                    />
                  ))}
                </>
              )}
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
