export default {
  siteMetadata: {
    title: "新型コロナ感染症 病床使用状況",
    titleTemplate: "%s",
    description:
      "日本国内の新型コロナ感染症の病床使用状況を都道府県別にまとめたダッシュボードです",
    siteUrl: "https://covid-19-japan.netlify.app",
    image: "", // Path to your image you placed in the 'static' folder
    twitterUsername: "kj002",
  },
  plugins: [
    `gatsby-plugin-emotion`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-151928183-1",
        head: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`,
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `types/graphql-types.d.ts`,
        documentPaths: ["./src/**/*.{ts,tsx}"],
      },
    },
  ],
}
