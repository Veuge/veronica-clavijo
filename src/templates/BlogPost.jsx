import { graphql } from "gatsby";
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

const BlogPost = ({ data, children }) => {
  const {
    mdx: { frontmatter },
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
          <MDXProvider components={components}>{children}</MDXProvider>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query PostById($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        date(formatString: "D MMMM YYYY", locale: "es")
        title
        description
        tags
      }
    }
  }
`;
