export const composeClasses = (...args) => args.join(" ");

export const HOME = "home";
export const POSTS = "posts";
export const PROJECTS = "projects";
export const WHOAMI = "whoAmI";

export const MAIN_RED = "#fa5252";
export const MAIN_GREEN = "#40c057";
export const MAIN_BLUE = "#15aabf";
export const GRAY = "#2a2b2e";
export const OTHER_GRAY = "#38444d";
export const LIGHT_GRAY = "#bdbdbd";
export const WHITE = "#f5f5f5";
export const LAVANDA = "#7950f2";
export const GREENISH = "#82c91e";
export const GREEN_LIGHT = "#12b886";
export const PLAIN_BLACK = "#000000";

export const sectionNameColors = {
  [HOME]: {
    title: "Este es un Hotfix",
    highlightColor: LAVANDA,
  },
  [POSTS]: {
    title: "Anotaciones",
    highlightColor: MAIN_GREEN,
  },
  [PROJECTS]: {
    title: "Proyectos",
    highlightColor: MAIN_RED,
  },
  [WHOAMI]: {
    title: "$ whoami",
    highlightColor: MAIN_BLUE,
  },
};

export const getHighlightColor = (section) => sectionNameColors[section].highlightColor;
