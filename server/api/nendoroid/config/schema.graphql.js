module.exports = {
    query: `
      nendoroidsCount(where: JSON): Int!
    `,
    resolver: {
      Query: {
        nendoroidsCount: {
          description: 'Return the count of nendoroids',
          resolverOf: 'application::nendoroid.nendoroid.count',
          resolver: async (obj, options, ctx) => {
            return await strapi.api.nendoroid.services.nendoroid.count(options.where || {});
          },
        },
      },
    },
  };