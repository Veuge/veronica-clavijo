import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import Seo from "../components/seo/Seo";
import PostsPreviews from "../components/postPreview/PostPreviews";
import { POSTS } from "../helpers";

const PostsPage = ({ location }) => {
  return (
    <Layout section={POSTS}>
      <PostsPreviews location={location} />
    </Layout>
  );
};

export default PostsPage;

export const Head = (props) => (
  <Seo
    {...props}
    section={POSTS}
  />
);

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
