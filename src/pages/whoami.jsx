import React from "react";
import Layout from "../components/layout/Layout";
import Presentation from "../components/presentation/Presentation";
import { WHOAMI } from "../helpers";

const WhoAmIPage = () => {
  return (
    <Layout section={WHOAMI}>
      <Presentation />
    </Layout>
  );
}

export default WhoAmIPage;
