import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";
import { Tag } from "../components/Tag";

const BlogPost = (props) => {
  console.log({props, data: props.data, title: props.data.mdx})
  return (
    <div>
      <h1>{props.data.mdx.frontmatter.title}</h1>
      <h2>{props.data.mdx.frontmatter.date}</h2>
      {props.data.mdx.frontmatter.tags.map(tag => (
        <Tag key={tag} tag={tag} />
      ))}
      <MDXRenderer>{props.data.mdx.body}</MDXRenderer>
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
