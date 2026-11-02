export const composeClasses = (...args) => args.filter(Boolean).join(" ");

export const HOME = "home";
export const POSTS = "posts";
export const PROJECTS = "projects";
export const WHOAMI = "whoAmI";
export const NOT_FOUND = "notFound";

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
    titleKey: "name",
    highlightColor: LAVANDA,
  },
  [POSTS]: {
    titleKey: "blog_section",
    highlightColor: MAIN_GREEN,
  },
  [PROJECTS]: {
    titleKey: "projects_section",
    highlightColor: MAIN_RED,
  },
  [WHOAMI]: {
    titleKey: "whoami_section",
    highlightColor: MAIN_BLUE,
  },
  [NOT_FOUND]: {
    titleKey: "not_found_title",
    highlightColor: MAIN_RED,
  },
};

export const getHighlightColor = (section) => sectionNameColors[section].highlightColor;
