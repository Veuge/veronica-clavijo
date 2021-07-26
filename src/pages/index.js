import * as React from "react";
import { graphql } from "gatsby";

import Info from "../components/Info";

// markup
const IndexPage = (props) => {
  console.log("IndexPage", {props});
  return (
    <main>
      <title>Veronica Clavijo</title>
      <h1>Hello</h1>
      <Info />
    </main>
  )
}

export const query = graphql`
  query ProfilePhoto {
    file(relativePath: {eq: "profile.jpeg"}) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP])
      }
    }
  }
`;

export default IndexPage
