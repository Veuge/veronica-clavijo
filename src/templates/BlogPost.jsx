import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import Layout from "../components/layout/Layout";
import Tag from "../components/tag/Tag";
import CodeBlock from "../components/Code";
import { POSTS } from "../helpers";
import * as styles from "../styles/blogpost.module.scss";

const components = {
  pre: CodeBlock,
};

const BlogPost = ({ data }) => {
  const {
    mdx: { frontmatter, body },
  } = data;
  return (
    <Layout section={POSTS}>
      <article className={styles.blogPostContainer}>
        <div className={styles.post}>
          <h1 className={styles.postTitle}>{frontmatter.title}</h1>
          <div className={styles.metaInfoContainer}>
            <span>{frontmatter.date}</span>
            {!!frontmatter.tags && (
              <>
                <FontAwesomeIcon
                  icon={faEllipsisV}
                  className={styles.separatorIcon}
                />
                {frontmatter.tags.map((tag) => (
                  <Tag
                    key={tag}
                    tag={tag}
                  />
                ))}
              </>
            )}
          </div>
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query PostBySlug($slug: String) {
    mdx(slug: { eq: $slug }) {
      slug
      body
      frontmatter {
        date(formatString: "D MMMM YYYY", locale: "es")
        title
        description
        tags
      }
    }
  }
`;
