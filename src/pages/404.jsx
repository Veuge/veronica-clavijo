import { Link } from "gatsby";

// styles
const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

const paragraphStyles = {
  marginBottom: 48,
};

// markup
const NotFoundPage = () => {
  return (
    <main style={pageStyles}>
      <title>Página no encontrada</title>
      <h1 style={headingStyles}>Error :: No pude encontrar la página</h1>
      <p style={paragraphStyles}>
        Lo siento{" "}
        <span
          role="img"
          aria-label="Pensive emoji"
        >
          😔
        </span>{" "}
        no pude encontrar lo que estás buscando.
        <br />
        <Link to="/">Volver a la página principal</Link>.
      </p>
    </main>
  );
};

export default NotFoundPage;
