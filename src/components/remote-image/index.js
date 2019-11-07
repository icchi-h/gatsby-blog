import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';

// OGP画像のURLを引数に取る
export default ({ url }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { fields: { RemoteImage: { eq: true } } }) {
          edges {
            node {
              childImageSharp {
                # resolutions(width: 250) {
                #   ...GatsbyImageSharpResolutions
                # }
                sizes(maxWidth: 800) {
                  ...GatsbyImageSharpSizes
                }
              }
              fields {
                RemoteImage
                link
              }
            }
          }
        }
      }
    `}
    render={data => {
      // OGP画像リストの中から、コンポーネント引数で指定したURLの画像を抽出する
      const image = data.images.edges.find(
        edge => edge.node.fields.link === url
      );

      if (!image) return null;

      // 画像が取得できた場合のみgatsby-imageのコンポーネントを返す
      return image.node.childImageSharp ? (
        <GatsbyImage
          // resolutions={image.node.childImageSharp.resolutions}
          sizes={image.node.childImageSharp.sizes}
        />
      ) : null;
    }}
  />
);
