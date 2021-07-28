import React from "react";
import { Link } from "gatsby";

export default function Navbar() {
  return (
    <nav>
      <h1>Veronica Clavijo</h1>
      <div>
        <Link to="/">Anotaciones</Link>
        <Link to="/proyectos">Proyectos</Link>
        <Link to="/whoami">$ whoami</Link>
      </div>
    </nav>
  );
};
