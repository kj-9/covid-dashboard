export default {
    siteMetadata: {
        title: "covid-19-japan-dashboard",
        titleTemplate: "%s 日本におけるcovid-19ダッシュボード",
        description: "日本におけるcovid-19ダッシュボード",
        url: "https://covid-19-japan.netlify.app",
        image: "", // Path to your image you placed in the 'static' folder
        twitterUsername: "",
      },  
    plugins: [
        `gatsby-plugin-sass`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/data/`,
            },
        },
    ]
}