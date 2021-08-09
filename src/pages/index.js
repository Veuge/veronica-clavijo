import * as React from "react";

import Info from "../components/Info";
import "@fontsource/ibm-plex-sans";
import Navbar from "../components/Navbar";
import PostPreviews from "../components/PostPreviews";

const IndexPage = () => {
  return (
    <main>
      <title>Veronica Clavijo</title>
      <Navbar />
      <Info />
      <PostPreviews />
    </main>
  )
};

export default IndexPage
