import React from "react";
import { graphql } from "gatsby";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Info (props) {
  console.log(props);
  return (
    <section>
      <h1>hey</h1>
    </section>
  );
};

// export const query = graphql`
//   query ProfilePhoto {
//     file(relativePath: {eq: "profile.jpeg"}) {
//       childImageSharp {
//         gatsbyImageData(layout: CONSTRAINED, placeholder: DOMINANT_COLOR, formats: [AUTO, WEBP])
//       }
//     }
//   }
// `;
