import "@fontsource/ibm-plex-sans";
import React from "react";
import Layout from "../components/layout/Layout";
import Presentation from "../components/presentation/Presentation";
import { HOME } from "../helpers";

const IndexPage = () => {
  return (
    <Layout section={HOME}>
      <Presentation />
    </Layout>
  )
};

export default IndexPage
