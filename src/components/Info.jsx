import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import * as styles from "../styles/info.module.css";

export default function Info(props) {
  const { file, site } = useStaticQuery(graphql`
    query MainQuery {
      file(relativePath: {eq: "profile.jpeg"}) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
            width: 100
            height: 100
          )
        }
      }
      site {
        siteMetadata {
          author
          description
          links {
            email
            github
            linkedin
            twitter
          }
          title
        }
      }
    }
  `);

  console.log({ file, site });

  return (
    <section className={styles.infoContainer}>
      <GatsbyImage
        image={getImage(file)}
        alt={"hey"}
        loading="lazy"
        style={{ borderRadius: "50%" }}
      />
      <div className={styles.info}>
        <h1>{site.siteMetadata.author}</h1>
        <h4>{site.siteMetadata.description}</h4>
        <div className={styles.contactContainer}>
          <a target="_blank" href={site.siteMetadata.links.twitter}>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a target="_blank" href={site.siteMetadata.links.github}>
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a target="_blank" href={site.siteMetadata.links.linkedin}>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a target="_blank" href={`mailto:${site.siteMetadata.links.email}`}>
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </section>
  );
}
