import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

export default function LanguageSwitcher() {
  const { languages, changeLanguage, language } = useI18next();

  return (
    <ul style={{ display: "flex", gap: "0.5rem", listStyle: "none" }}>
      {languages.map((lng) => (
        <li key={lng}>
          <button
            onClick={() => changeLanguage(lng)}
            style={{
              fontWeight: "bold",
              textDecoration: language === lng ? "underline" : "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: language === lng ? "#7950f2" : "#fff",
            }}
          >
            {lng.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
}
