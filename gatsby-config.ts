export default {
    plugins: [
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `src`,
                path: `${__dirname}/data/`,
            },
        },
    ]
}