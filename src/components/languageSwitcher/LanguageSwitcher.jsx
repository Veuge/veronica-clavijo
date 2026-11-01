import React from "react";
import { useI18next } from "gatsby-plugin-react-i18next";

import { LAVANDA, WHITE } from "../../helpers";

const LANGUAGE_NAMES = {
  en: "English",
  es: "Español",
};

export default function LanguageSwitcher() {
  const { languages, changeLanguage, language, t } = useI18next();

  return (
    <ul
      aria-label={t("language_switcher_label")}
      style={{ display: "flex", gap: "0.5rem", listStyle: "none" }}
    >
      {languages.map((lng) => {
        const isActive = language === lng;

        return (
          <li key={lng}>
            <button
              type="button"
              lang={lng}
              aria-label={LANGUAGE_NAMES[lng] || lng}
              aria-pressed={isActive}
              onClick={() => changeLanguage(lng)}
              style={{
                fontWeight: "bold",
                textDecoration: isActive ? "underline" : "none",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isActive ? LAVANDA : WHITE,
              }}
            >
              {lng.toUpperCase()}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
