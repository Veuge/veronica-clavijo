import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Tag } from "../components/Tag";
import CodeBlock from "../components/Code";
import { MDXProvider } from "@mdx-js/react";
import * as styles from "../styles/blogpost.module.scss";

const components = {
  pre: CodeBlock
}

const BlogPost = ({ data }) => {
  const { mdx: { frontmatter, body } } = data;
  return (
    <article className={styles.blogPostContainer}>
      <div className={styles.post}>
        <h1 className={styles.postTitle}>{frontmatter.title}</h1>
        <div className={styles.metaInfoContainer}>
          <span>{frontmatter.date}</span>
          {!!frontmatter.tags && frontmatter.tags.map(tag => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <MDXProvider components={components}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </div>
    </article>
  );
};

export default BlogPost;

export const query = graphql`
  query PostBySlug($slug: String) {
    mdx(slug: {eq: $slug}) {
      slug
      body
      frontmatter {
        date(formatString: "d MMMM YYYY", locale: "es")
        title
        description
        tags
      }
    }
  }
`
