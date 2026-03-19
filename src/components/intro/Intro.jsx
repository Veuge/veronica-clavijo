import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import * as styles from "./intro.module.scss";

const Intro = ({ file, links }) => {
  return (
    <section className={styles.introContainer}>
      <GatsbyImage
        image={getImage(file)}
        alt={"Foto de perfil, por Luis Fernando Vera Cardenas"}
        loading="lazy"
        className={styles.avatar}
      />
      <div className={styles.description}>
        <p>
          Hola! soy Verónica Clavijo y este es mi{" "}
          <a
            href="https://maggieappleton.com/garden-history"
            target="__blank"
          >
            jardín digital
          </a>{" "}
          lo que quiere decir que en este blog nada es definitivo, todo está sujeto a cambio, o sea
          la información puede cambiar, crecer o evolucionar.
        </p>
        <p>
          Escribo principalmente de JS, React, React Native y mi camino hacia convertirme es
          FullStack Developer.
        </p>
        <p>
          Si quieres charlar mandame un{" "}
          <a
            className={styles.redc}
            href={`mailto:${links.email}`}
          >
            email
          </a>
          , escribeme un{" "}
          <a
            className={styles.greenc}
            href={links.twitter}
            target="__blank"
          >
            tweet
          </a>{" "}
          o un{" "}
          <a
            className={styles.bluec}
            href={links.linkedin}
            target="__blank"
          >
            mensaje directo
          </a>
        </p>
      </div>
    </section>
  );
};

export default Intro;
