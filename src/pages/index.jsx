import "@fontsource/ibm-plex-sans";
import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import Intro from "../components/intro/Intro";
import { HOME } from "../helpers";

const IndexPage = ({ data }) => {
  const style = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }
  return (
    <Layout section={HOME} style={style}>
      <Intro
        file={data.file}
        links={data.site.siteMetadata.links}
      />
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
