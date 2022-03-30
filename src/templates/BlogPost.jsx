import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Tag } from "../components/Tag";
import CodeBlock from "../components/Code";
import { MDXProvider } from "@mdx-js/react";
import * as styles from "../styles/code.module.scss";

const components = {
  pre: CodeBlock
}

const BlogPost = (props) => {
  return (
    <div className={styles.postContainer}>
      <h1>{props.data.mdx.frontmatter.title}</h1>
      <h2>{props.data.mdx.frontmatter.date}</h2>
      {!!props.data.mdx.frontmatter.tags && props.data.mdx.frontmatter.tags.map(tag => (
        <Tag key={tag} tag={tag} />
      ))}
      <MDXProvider components={components}>
        <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
      </MDXProvider>
    </div>
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
