import React from "react";
import Layout from "../components/layout/Layout";
import PresentationExtended from "../components/presentation/PresentationExtended";
import { WHOAMI } from "../helpers";

const WhoAmIPage = () => {
  return (
    <Layout section={WHOAMI}>
      <PresentationExtended />
    </Layout>
  );
}

export default WhoAmIPage;
