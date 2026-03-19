import { graphql, useStaticQuery, Link } from "gatsby";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Tag from "../tag/Tag";
import * as styles from "./postpreviews.module.scss";

export default function PostPreview() {
  const { allMdx } = useStaticQuery(graphql`
    query PostPreviews {
      allMdx(sort: { frontmatter: { date: DESC } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "D MMMM YYYY", locale: "es")
              description
              tags
            }
          }
        }
      }
    }
  `);

  return (
    <div className={styles.postPreviews}>
      {allMdx.edges.map(({ node }) => (
        <Link
          to={`/posts${node.fields.slug}`}
          key={node.fields.slug}
        >
          <article
            className={styles.postPreviewContainer}
            key={node.id}
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
