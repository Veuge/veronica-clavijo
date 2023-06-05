import React from 'react';
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import * as classNames from './presentation.module.scss';

const PresentationExtended = () => {
  const { file } = useStaticQuery(graphql`
    query PresentationExtendedQuery {
      file(relativePath: {eq: "profile3.jpg"}) {
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
    <div className={classNames.container} style={{ flexDirection: 'column' }}>
      <GatsbyImage
        image={getImage(file)}
        alt={'hey'}
        loading="lazy"
        className={classNames.profile}
      />
      <div className={classNames.content}>
        <p>Hola, hola!. Mi nombre es Verónica Clavijo (puedes llamarme que <span>Vero</span> es mas corto y amigable o <span>Veuge</span> que es la <i>inteligente</i> abreviación de mis dos nombres - Verónica Eugenia).</p>
        <br/>
        <p>Por un por un voto de confianza de dos buenos amigos comencé a trabajar el 2017 como desarrolladora (casi inmediatamente después de graduarme de la Universidad como Licenciada de Informática y con nada de experiencia en el desarrollo de software), inicialmente como lo que llamaban <i>ghost dev</i>, hacia commits a nombre de un miembro del equipo en el que estaba hasta ganarme mi lugar xD. Pasé por muchos proyectos en este tiempo, comenzando por ExtJS, React, React Native y actualmente NodeJS y ExpressJS. lo que es muy bueno porque ya hacían varios anhos en los que estaba buscando ser FullStack developer.</p>
        <br/>
        {/* <p>Fuera del trabajo estoy todavía encontrando lo que me gusta, definitivamente me gusta viajar, hacer caminatas. Paso mucho tiempo con mi familia, me encanta jugar y hablar con mis sobrinos, claramente tengo mis favoritos pero ellos no saben. En los años de colegio pase mas de 7 años bailando en un Ballet Folklórico que ocasionalmente hacía presentaciones de música contemporánea también, eso no terminó bien, pero el recuerdo queda y las fotos tambien.</p>
        <br/> */
        <h3>Que uso?</h3>}
        <dl>
          <dt>Operating System</dt>
          <dd>Debian 11 (bullseye)</dd>

          <dt>Desktop Environment</dt>
          <dd>XFCE 4.16</dd>

          <dt>Terminal</dt>
          <dd>Guake + tmux (con <a href={'https://github.com/Veuge/Configuration-files/blob/master/tmux.conf'} target='_blank' rel="noreferrer">esta</a> configuración)</dd>

          <dt>Editor de código</dt>
          <dd>VS Code + <a href='https://github.com/daltonmenezes/aura-theme'>Aura Theme</a> + <a href="https://www.jetbrains.com/lp/mono/">JetBrains Mono</a></dd>

          <dt>Navegador</dt>
          <dd>Brave</dd>

          <dt>Notas y Knowledge Base</dt>
          <dd>Notion</dd>
        </dl>
      </div>
    </div>
  )
}

export default PresentationExtended;
