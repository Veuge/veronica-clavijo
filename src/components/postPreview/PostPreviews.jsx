import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Link, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Tag from "../tag/Tag";
import * as styles from "./postpreviews.module.scss";

export default function PostPreview() {
  const { language } = useI18next();
  const { t } = useTranslation();

  const { allMdx } = useStaticQuery(graphql`
    query PostPreviews {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            internal {
              contentFilePath
            }
            frontmatter {
              title
              date(formatString: "D MMMM YYYY", locale: "es")
              description
            }
          }
        }
      }
    }
  `);

  // Show only posts matching the active language
  const posts = allMdx.edges.filter(({ node }) => {
    const isSpanish = node.internal.contentFilePath.endsWith(".es.mdx");
    return language === "es" ? isSpanish : !isSpanish;
  });

  // Normalize slug — remove .es suffix if present
  const getSlug = (node) => node.fields.slug.replace(/\.es\/$/, "/");

  return (
    <div className={styles.postPreviews}>
      {posts.map(({ node }) => (
        <Link
          to={`/posts${getSlug(node)}`}
          language={language}
          key={node.id}
        >
          <article className={styles.postPreviewContainer}>
            <h1>{node.frontmatter.title}</h1>
            <h3>{node.frontmatter.description}</h3>
            <div className={styles.footerContainer}>
              <span>
                {t("posted_on")} {node.frontmatter.date}
              </span>
              {!!node.frontmatter.tags && (
                <>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className={styles.separatorIcon}
                  />
                  {node?.frontmatter?.tags?.map((tag) => (
                    <Tag key={tag} tag={tag} />
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
