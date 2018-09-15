import React from 'react'
import Link from 'gatsby-link';

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src="https://s.gravatar.com/avatar/37d27f624f8c9c8db6fe6b6581b256f1?s=80"
          alt={`Takuto Inoue`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: rhythm(1),
          }}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div>東京でJavaのSIerやってます。</div>
          <div className="profile" style={{display: 'flex',fontSize: '1.6em'}}>
            <a
              className="profile__link"
              href="https://github.com/Takumon">
              <FontAwesomeIcon
                color="#333"
                className="profile__icon"
                icon={faGithubSquare} />
            </a>
            <a
              className="profile__link"
              href="https://twitter.com/inouetakumon?lang=ja">
              <FontAwesomeIcon
                color="#3eaded"
                className="profile__icon"
                icon={faTwitterSquare} />
            </a>
            <a
              className="profile__link"
              href="https://qiita.com/Takumon">
              <FontAwesomeIcon
                color="white"
                className="profile__icon"
                style={{
                  overflow: 'hidden',
                  height: '0.9em',
                  width: '0.9em',
                  backgroundColor: '#4cb10d',
                  borderRadius: '2px',
                  marginTop: '2px',
                }}
                icon={faSearch} />
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Bio
