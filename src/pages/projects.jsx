import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import Seo from "../components/seo/Seo";
import ProjectPreviews from "../components/projectPreview/ProjectPreviews";
import { PROJECTS } from "../helpers";

const ProjectsPage = ({ data }) => {
  return (
    <Layout section={PROJECTS}>
      <ProjectPreviews projects={data.projects.edges} />
    </Layout>
  );
};

export default ProjectsPage;

export const Head = (props) => (
  <Seo
    {...props}
    section={PROJECTS}
  />
);

export const query = graphql`
  query ($language: String!) {
    projects: allMdx(
      filter: { fields: { collection: { eq: "projects" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
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
            dateEn: date(formatString: "MMMM YYYY", locale: "en")
            dateEs: date(formatString: "MMMM YYYY", locale: "es")
            description
            cover {
              childImageSharp {
                gatsbyImageData(
                  width: 600
                  aspectRatio: 1.6
                  placeholder: DOMINANT_COLOR
                  formats: [AUTO, WEBP]
                )
              }
            }
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
