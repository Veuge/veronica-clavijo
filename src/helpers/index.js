export const composeClasses = (...args) => args.filter(Boolean).join(" ");

// MDX content: `index.es.mdx` is the Spanish version, `index.mdx` the English one.
export const isSpanishFile = (contentFilePath) => contentFilePath.endsWith(".es.mdx");

// Keeps only the MDX nodes (allMdx edges) written in `language`.
export const filterByLanguage = (edges, language) =>
  edges.filter(({ node }) => isSpanishFile(node.internal.contentFilePath) === (language === "es"));

// The Spanish file's directory slug ends in ".es/": both languages share one URL slug.
export const normalizeSlug = (slug) => slug.replace(/\.es\/$/, "/");

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
