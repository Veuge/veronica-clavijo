import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import PresentationExtended from "../components/presentation/PresentationExtended";
import { WHOAMI } from "../helpers";

const WhoAmIPage = () => {
  return (
    <Layout section={WHOAMI}>
      <PresentationExtended />
    </Layout>
  );
};

export default WhoAmIPage;

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
