import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import * as classNames from './presentation.module.scss';

const Presentation = () => {
  const { file, site } = useStaticQuery(graphql`
    query PresentationQuery {
      file(relativePath: {eq: "profile2.jpg"}) {
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
          alt={'hey'}
          loading="lazy"
          style={{ borderRadius: '50%' }}
        />
      </div>
      <div className={classNames.content}>
        <p>
          Hola, mi nombre es Verónica Clavijo (<span>Vero</span> o <span>Veuge</span>). Trabajo como
          Desarrolladora desde 2017, principalmente en proyectos de Estados Unidos y Europa. Trabajo
          principalmente con Javascript, React y React Native. En busca de ser Fullstack.
        </p>
        <br />
        <p>
          Bienvenido a mi{' '}
          <a href="https://maggieappleton.com/garden-history" target="_blank" rel="noreferrer">
            <b>jardin digital</b>
          </a>
          , aqui trataré de escribir mis aprendizajes del día a día, proyectos personales y
          misceláneos. Nada aqui está en su versión final, todo está en constante evolución y
          trataré de actualizar de esa manera los contenidos.
        </p>
        <br />
        <p>
          <b>Si quieres charlar puedes encontrarme en:</b>
        </p>
        <div className={classNames.links}>
          <a target="_blank" href={links.twitter} rel="noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a target="_blank" href={links.github} rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a target="_blank" href={links.linkedin} rel="noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a target="_blank" href={`mailto:${links.email}`} rel="noreferrer">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Presentation;
