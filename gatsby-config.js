const config = require('./src/config/blog-config');
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `${config.blogTitle} | ${config.blogDescription}`,
    author: config.blogAuthor,
    description: config.blogDescription,
    siteUrl: config.blogUrl,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-katex`,
          `gatsby-remark-graphviz`,
          `gatsby-remark-code-titles`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
          `gatsby-remark-embed-youtube`,
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: true,
            },
          },
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-emojis',
            options: {
              active: true,
              size: 64,
              styles: {
                display: 'inline',
                margin: '0',
                'margin-top': '1px',
                position: 'relative',
                top: '5px',
                width: '25px',
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-qiita`,
      options: {
        accessToken: process.env.QIITA_ACCESS_TOKEN,
        userName: config.blogAuthorQiitaUserName,
        excludedPostIds: [],
      },
    },
    `gatsby-remark-headings-detail`,
    `gatsby-remark-and-qiita`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-47709529-5`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.blogTitle,
        short_name: config.blogTitle,
        start_url: '/?utm_source=homescreen',
        background_color: '#252525',
        theme_color: '#f5f5f5',
        display: 'minimal-ui',
        icons: [
          {
            src: 'icons/icon-72x72.png',
            sizes: '72x72',
            type: 'image/png',
          },
          {
            src: 'icons/icon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
          {
            src: 'icons/icon-128x128.png',
            sizes: '128x128',
            type: 'image/png',
          },
          {
            src: 'icons/icon-144x144.png',
            sizes: '144x144',
            type: 'image/png',
          },
          {
            src: 'icons/icon-152x152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `blue`,
        showSpinner: true,
      },
    },
    `gatsby-plugin-no-sourcemaps`,
    `gatsby-plugin-lodash`,
    {
      resolve: `gatsby-plugin-webpack-bundle-analyzer`,
      options: {
        openAnalyzer: false,
      },
    },
    'gatsby-plugin-top-layout',
    {
      resolve: 'gatsby-plugin-material-ui',
      // If you want to use styled components you should change the injection order.
      options: {
        // stylesProvider: {
        //   injectFirst: true,
        // },
      },
    },
  ],
};
