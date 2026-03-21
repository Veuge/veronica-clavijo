import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Trans } from "react-i18next";

import * as classNames from "./presentation.module.scss";

const PresentationExtended = () => {
  const { file } = useStaticQuery(graphql`
    query PresentationExtendedQuery {
      file(relativePath: { eq: "profile3.jpg" }) {
        childImageSharp {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            formats: [AUTO, WEBP]
            width: 200
          )
        }
      }
    }
  `);

  return (
    <div
      className={classNames.container}
      style={{ flexDirection: "column" }}
    >
      <GatsbyImage
        image={getImage(file)}
        alt={"hey"}
        loading="lazy"
        className={classNames.profile}
      />
      <div className={classNames.content}>
        <p>
          <Trans
            i18nKey="whoami_p1"
            components={[<span key="0">Vero</span>, <span key="1">Veuge</span>, <i key="2">inteligente</i>]}
          />
        </p>
        <br />
        <p>
          <Trans
            i18nKey="whoami_p2"
            components={[<i key="0">ghost dev</i>]}
          
          />
        </p>
        <br />
        {
          /* <p>Fuera del trabajo estoy todavía encontrando lo que me gusta, definitivamente me gusta viajar, hacer caminatas. Paso mucho tiempo con mi familia, me encanta jugar y hablar con mis sobrinos, claramente tengo mis favoritos pero ellos no saben. En los años de colegio pase mas de 7 años bailando en un Ballet Folklórico que ocasionalmente hacía presentaciones de música contemporánea también, eso no terminó bien, pero el recuerdo queda y las fotos tambien.</p>
        <br/> */
          <h3><Trans i18nKey="whoami_p3" /></h3>
        }
        <dl>
          <dt><Trans i18nKey="operating_system" /></dt>
          <dd>Debian 11 (bullseye)</dd>

          <dt><Trans i18nKey="desktop_environment" /></dt>
          <dd>XFCE 4.16</dd>

          <dt>Terminal</dt>
          <dd>
            <Trans
              i18nKey="terminal"
              components={[<a
              key="0"
              href={"https://github.com/Veuge/Configuration-files/blob/master/tmux.conf"}
              target="_blank"
              rel="noreferrer"
            >
              esta
            </a>]}
            />
            Guake + tmux (con{" "}
            <a
              href={"https://github.com/Veuge/Configuration-files/blob/master/tmux.conf"}
              target="_blank"
              rel="noreferrer"
            >
              esta
            </a>{" "}
            configuración)
          </dd>

          <dt><Trans i18nKey="code_editor" /></dt>
          <dd>
            VS Code + <a href="https://github.com/daltonmenezes/aura-theme">Aura Theme</a> +{" "}
            <a href="https://www.jetbrains.com/lp/mono/">JetBrains Mono</a>
          </dd>

          <dt><Trans i18nKey="browser" /></dt>
          <dd>Brave</dd>

          <dt><Trans i18nKey="notes" /></dt>
          <dd>Notion</dd>
        </dl>
      </div>
    </div>
  );
};

export default PresentationExtended;
