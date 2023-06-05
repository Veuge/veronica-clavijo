const templatePath = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query BlogPostSlugs {
      allMdx {
        edges {
          node {
            slug
          }
        }
      }
    }
  `);

  data.allMdx.edges.forEach((edge) => {
    actions.createPage({
      path: `posts/${edge.node.slug}`,
      component: templatePath.resolve("./src/templates/BlogPost.jsx"),
      context: {
        slug: edge.node.slug,
      },
    });
  });
};
