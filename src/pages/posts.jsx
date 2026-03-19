import React from "react";
import { graphql } from "gatsby";

import Layout from "../components/layout/Layout";
import PostsPreviews from "../components/postPreview/PostPreviews";
import { POSTS } from "../helpers";

const PostsPage = () => {
  return (
    <Layout section={POSTS}>
      <PostsPreviews />
    </Layout>
  );
};

export default PostsPage;

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
