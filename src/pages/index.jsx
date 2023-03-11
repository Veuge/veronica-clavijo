import "@fontsource/ibm-plex-sans";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import Layout from "../components/layout/Layout";
import Presentation from "../components/presentation/Presentation";
import { HOME } from "../helpers";

const IndexPage = () => {
  const { file, site } = useStaticQuery(graphql`
    query PresentationQuery {
      file(relativePath: {eq: "profile2.jpg"}) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
            width: 150
            height: 150
          )
        }
      }
      site {
        siteMetadata {
          links {
            email
            github
            linkedin
            twitter
          }
        }
      }
    }
  `);

  return (
    <Layout section={HOME}>
      <Presentation file={file} links={site.siteMetadata.links} />
    </Layout>
  )
};

export const query = graphql`
  query InfoQuery {
    file(relativePath: {eq: "profile.jpeg"}) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: DOMINANT_COLOR
          formats: [AUTO, WEBP]
          width: 150
          height: 150
        )
      }
    }
    site {
      siteMetadata {
        links {
          email
          github
          linkedin
          twitter
        }
      }
    }
  }`;

export default IndexPage
