import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import * as styles from "../styles/info.module.css";

export default function Info (props) {
  const { file } = useStaticQuery(graphql`
    query ProfilePhoto {
      file(relativePath: {eq: "profile.jpeg"}) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
          )
          fluid(maxWidth: 50) {
            base64
          }
        }
      }
    }
  `);

  return (
    <section className={styles.infoContainer}>
      <GatsbyImage
        image={getImage(file)}
        alt={"hey"}
        loading="lazy"
      />
      <h1>Veronica Clavijo</h1>
      <h4>Este es un hotfix</h4>
      <div>
        <a><FontAwesomeIcon icon={faTwitter} /></a>
        <a><FontAwesomeIcon icon={faGithub} /></a>
        <a><FontAwesomeIcon icon={faLinkedin} /></a>
        <a><FontAwesomeIcon icon={faEnvelope} /></a>
      </div>
    </section>
  );
};
