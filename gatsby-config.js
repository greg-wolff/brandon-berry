module.exports = {
  siteMetadata: {
    title: `Brandon Berry`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `06dfskiww5fu`,
        accessToken: `99c776c3846b3feb697d604696bc1f7a82c06e96a995bd34fdab6a3c103a45e2`,
      },
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ['Lora']
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-plugin-netlify`
  ],
}
