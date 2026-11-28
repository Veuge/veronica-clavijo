import React, { useRef } from "react";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { useTranslation } from "gatsby-plugin-react-i18next";

import Layout from "../components/layout/Layout";
import Seo from "../components/seo/Seo";
import CodeBlock from "../components/Code";
import PostLink from "../components/PostLink";
import DetailsList from "../components/detailsList/DetailsList";
import ImageLightbox from "../components/imageLightbox/ImageLightbox";
import { PROJECTS } from "../helpers";
import * as postStyles from "../styles/blogpost.module.scss";
import * as styles from "../styles/project.module.scss";

const components = {
  pre: CodeBlock,
  a: PostLink,
};

// "https://github.com/Veuge/covid19/" -> "github.com/Veuge/covid19"
const displayUrl = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

const ExternalLink = ({ href }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
  >
    {displayUrl(href)}
  </a>
);

const Project = ({ data, children }) => {
  const { t } = useTranslation();
  const {
    mdx: { frontmatter },
  } = data;
  const { title, date, cover, stack, repo, live } = frontmatter;
  const coverImage = getImage(cover);
  // The lightbox listens to image clicks (cover included) inside the project body.
  const postRef = useRef(null);

  return (
    <Layout section={PROJECTS}>
      <article
        className={postStyles.blogPostContainer}
        // Reuse the post body styles with the Projects color.
        style={{ "--accent": "var(--mainRed)" }}
      >
        <div
          className={postStyles.post}
          ref={postRef}
        >
          {coverImage && (
            <GatsbyImage
              image={coverImage}
              alt={title}
              className={styles.cover}
            />
          )}
          <div className={styles.header}>
            <h1>{title}</h1>
            <span className={styles.date}>{date}</span>
          </div>

          <h2>{t("project_details")}</h2>
          <DetailsList
            className={styles.details}
            items={[
              { term: t("project_stack"), description: stack?.join(", ") },
              { term: t("project_repo"), description: repo && <ExternalLink href={repo} /> },
              { term: t("project_live"), description: live && <ExternalLink href={live} /> },
            ]}
          />

          <MDXProvider components={components}>{children}</MDXProvider>
        </div>
        <ImageLightbox containerRef={postRef} />
      </article>
    </Layout>
  );
};

export default Project;

export const Head = (props) => {
  const { frontmatter } = props.data.mdx;

  return (
    <Seo
      {...props}
      section={PROJECTS}
      title={frontmatter.title}
      description={frontmatter.description}
    />
  );
};

export const query = graphql`
  query ProjectByIdAndLanguage($id: String!, $language: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        description
        date(formatString: "MMMM YYYY", locale: $language)
        stack
        repo
        live
        cover {
          childImageSharp {
            gatsbyImageData(
              width: 900
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
