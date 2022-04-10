export const composeClasses = (...args) => args.join(" ");

export const HOME = "home";
export const POSTS = "posts";
export const PROJECTS = "projects";
export const WHOAMI = "whoAmI";

export const sectionNameColors = {
  [HOME]: {
    title: "Este es un Hotfix",
    highlightColor: "lavanda",
  },
  [POSTS]: {
    title: "Anotaciones",
    highlightColor: "mainGreen",
  },
  [PROJECTS]: {
    title: "Proyectos",
    highlightColor: "mainRed",
  },
  [WHOAMI]: {
    title: "$ whoami",
    highlightColor: "mainBlue"
  },
}

export const getHighlightColor = (section) =>
  sectionNameColors[section].highlightColor;
