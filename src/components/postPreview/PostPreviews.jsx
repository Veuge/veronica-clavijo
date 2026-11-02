import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { graphql, useStaticQuery } from "gatsby";
import { Link, useI18next, useTranslation } from "gatsby-plugin-react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Tag from "../tag/Tag";
import * as styles from "./postpreviews.module.scss";

export default function PostPreview({ location }) {
  const { language } = useI18next();
  const { t } = useTranslation();

  // The ?tag= filter only exists in the browser. Read it after mounting so the first render
  // matches the server-rendered HTML (all posts) and React hydration doesn't break.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const requestedTag = mounted ? new URLSearchParams(location?.search).get("tag") : null;

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
              dateEn: date(formatString: "D MMMM YYYY", locale: "en")
              dateEs: date(formatString: "D MMMM YYYY", locale: "es")
              description
              tags
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

  // Tags used by this language's posts, most used first, with how many posts use each
  const counts = {};
  posts.forEach(({ node }) =>
    (node.frontmatter.tags || []).forEach((tag) => {
      counts[tag] = (counts[tag] || 0) + 1;
    })
  );
  const tagCounts = Object.entries(counts).sort(([a, x], [b, y]) => y - x || a.localeCompare(b));

  // Ignore tags that don't exist in this language (e.g. after switching languages)
  const activeTag = tagCounts.some(([tag]) => tag === requestedTag) ? requestedTag : null;
  const visiblePosts = activeTag
    ? posts.filter(({ node }) => (node.frontmatter.tags || []).includes(activeTag))
    : posts;

  // Normalize slug — remove .es suffix if present
  const getSlug = (node) => node.fields.slug.replace(/\.es\/$/, "/");

  return (
    <div className={styles.postPreviews}>
      {tagCounts.length > 0 && (
        <nav
          className={styles.tagFilter}
          aria-label={t("filter_by_tag")}
        >
          <span className={styles.tagFilterLabel}>{t("filter_by_tag")}:</span>
          <Tag
            linked
            active={!activeTag}
          >
            {t("all_tags")}
          </Tag>
          {tagCounts.map(([tag, count]) => (
            <Tag
              key={tag}
              tag={tag}
              linked
              active={tag === activeTag}
            >
              {tag} <span className={styles.tagCount}>{count}</span>
            </Tag>
          ))}
        </nav>
      )}

      {visiblePosts.map(({ node }) => (
        <Link
          to={`/posts${getSlug(node)}`}
          language={language}
          key={node.id}
        >
          <article className={styles.postPreviewContainer}>
            <h1>{node.frontmatter.title}</h1>
            <h3>{node.frontmatter.description}</h3>
            <div className={styles.footerContainer}>
              <span className={styles.date}>
                {t("posted_on")}{" "}
                {language === "es" ? node.frontmatter.dateEs : node.frontmatter.dateEn}
              </span>
              {node.frontmatter.tags?.length > 0 && (
                <>
                  <FontAwesomeIcon
                    icon={faEllipsisV}
                    className={styles.separatorIcon}
                  />
                  {node.frontmatter.tags.map((tag) => (
                    <Tag
                      key={tag}
                      tag={tag}
                      active={tag === activeTag}
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

PostPreview.propTypes = {
  location: PropTypes.shape({ search: PropTypes.string }),
};
