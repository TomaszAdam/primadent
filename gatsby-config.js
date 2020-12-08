module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: "f6d5b903735d1a1bbdb11c2ec38cb7",
      },
    },
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        // Available options and their defaults:
        stripMetadata: true,
        defaultQuality: 50,
        failOnError: true,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-image",
  ],
};
