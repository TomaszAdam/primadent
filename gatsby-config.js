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
  ],
};
