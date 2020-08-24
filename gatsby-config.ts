export default {
    siteMetadata: {
        title: "コロナ感染状況ダッシュボード",
        titleTemplate: "%s",
        description: "日本国内の都道府県別コロナ感染状況をまとめたダッシュボードです",
        url: "https://covid-19-japan.netlify.app",
        image: "", // Path to your image you placed in the 'static' folder
        twitterUsername: "",
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-151928183-1",
                head: true,
            },
        },
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