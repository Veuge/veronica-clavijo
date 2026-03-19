import React from "react";

import "@fontsource/ibm-plex-sans";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import Presentation from "../components/presentation/Presentation";
import { HOME } from "../helpers";

const IndexPage = () => {
  return (
    <Layout section={HOME}>
      <Presentation />
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query ($language: String!) {
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
