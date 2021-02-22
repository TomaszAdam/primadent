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
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyAwzp6Zp3cV98EjVO81buDmIlwsn-JfL0M",
          authDomain: "primadent-d96de.firebaseapp.com",
          databaseURL:
            "https://primadent-d96de-default-rtdb.europe-west1.firebasedatabase.app",
          projectId: "primadent-d96de",
          storageBucket: "primadent-d96de.appspot.com",
          messagingSenderId: "375690770066",
          appId: "1:375690770066:web:ac1e660985944b14e8584b",
          measurementId: "G-VCL1MJF0NR",
        },
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/panel/*`] },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-image",
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 255958797, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-analytics", // default
          anonymize: true, // default
          allowAdFeatures: false, // default
        },
        googleTagManager: {
          trackingId: null, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-google-tagmanager", // default
          dataLayerName: "dataLayer", // default
        },
        facebookPixel: {
          pixelId: null, // leave empty if you want to disable the tracker
          cookieName: "gatsby-gdpr-facebook-pixel", // default
        },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ["production", "development"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `primadentwrzesnia`,
        short_name: `primadent`,
        start_url: `/`,
        background_color: `#f7f0eb`,
        theme_color: `#a2466c`,
        display: `standalone`,
        icon: "static/favicon_primadent.png",
      },
    },
  ],
};
