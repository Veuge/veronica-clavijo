import React from "react";
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
