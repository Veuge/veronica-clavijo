import React, { useMemo } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Trans, useTranslation } from "react-i18next";

import * as classNames from "./presentation.module.scss";

const Presentation = () => {
  const { t } = useTranslation();
  const { file, site } = useStaticQuery(graphql`
    query PresentationQuery {
      file(relativePath: { eq: "profile3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
            width: 150
            height: 150
          )
        }
      }
      site {
        siteMetadata {
          links {
            email
            github
            linkedin
            twitter
          }
        }
      }
    }
  `);

  const links = useMemo(() => site.siteMetadata.links, [site]);

  return (
    <div className={classNames.container}>
      <div className={classNames.profilePicContainer}>
        <GatsbyImage
          image={getImage(file)}
          alt={"Veronica Clavijo"}
          loading="lazy"
          className={classNames.avatar}
        />
      </div>
      <div className={classNames.content}>
        <p>
          <Trans
            i18nKey="about_me_p1"
            components={[<span key="0">Vero</span>, <span key="1">Veuge</span>]}
          />
        </p>
        <br />
        <p>
          <Trans
            i18nKey="about_me_p2"
            components={[
              <a
                key="0"
                href="https://maggieappleton.com/garden-history"
                target="_blank"
                rel="noreferrer"
              >
                digital garden
              </a>,
            ]}
          />
        </p>
        <br />
        <p>
          <b>{t("about_me_p3")}</b>
        </p>
        <div className={classNames.links}>
          <a
            target="_blank"
            href={links.twitter}
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            target="_blank"
            href={links.github}
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            target="_blank"
            href={links.linkedin}
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            target="_blank"
            href={`mailto:${links.email}`}
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
