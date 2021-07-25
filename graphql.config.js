// graphql.config.js
module.exports = {
  projects: {
    app: {
      schema: ["api/dist/schema.gql"],
      documents: ["web/**/*.{graphql,js,ts,jsx,tsx}"],
      extensions: {
        endpoints: {
          default: {
            url: "http://localhost:4000/graphql",
          },
        },
      }
    },
  },
}