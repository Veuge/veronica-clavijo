import * as React from "react";

import Info from "../components/Info";
import "@fontsource/ibm-plex-sans";
import Navbar from "../components/Navbar";
import PostPreview from "../components/PostPreview";

// markup
const IndexPage = (props) => {
  console.log("IndexPage", {props});
  return (
    <main>
      <title>Veronica Clavijo</title>
      <Navbar />
      <Info />
      <PostPreview />
    </main>
  )
};

export default IndexPage
