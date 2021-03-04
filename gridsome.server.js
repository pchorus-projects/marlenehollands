// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  });

  api.createPages(({ createPage }) => {
    api.createPages(async ({ graphql, createPage }) => {
      const { data } = await graphql(`
        query {
          prismic {
            aquarelle: allAquarells(sortBy: title_ASC) {
              edges {
                node {
                  _meta {
                    uid
                  }
                }
              }
            }
          }
        }
      `);

      data.prismic.aquarelle.edges.forEach(({ node }) => {
        createPage({
          path: `/aquarelle/${node._meta.uid}/`,
          component: './src/templates/Aquarell.vue',
          context: {
            uid: node._meta.uid,
          },
        });
      });
    });
  });
};
