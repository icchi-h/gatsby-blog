import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import Chip from '@material-ui/core/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

import styles from './index.module.scss';

const forceTagStyle = {
  backgroundColor: 'white',
  border: '1px solid #e6e6e6',
  borderRadius: '4px',
  padding: '4px',
  height: '110%',
};

class Tag extends React.Component {
  render() {
    const { value, count, isLink = true } = this.props;
    // const CountTag =

    if (isLink) {
      return (
        <Link to={`/tag/${kebabCase(value)}`} className={styles.tag}>
          <Chip
            icon={<FontAwesomeIcon icon={faHashtag} />}
            label={
              <span>
                {value}
                {count ? (
                  <span className={styles.tag_count}>{count}</span>
                ) : null}
              </span>
            }
            size="small"
            style={forceTagStyle}
          ></Chip>
        </Link>
      );
    } else {
      return (
        <Chip
          icon={<FontAwesomeIcon icon={faTags} />}
          label={
            <span>
              {value}
              {count ? <span className={styles.tag_count}>{count}</span> : null}
            </span>
          }
          size="small"
          className={styles.tag}
          style={forceTagStyle}
        />
      );
    }
  }
}

export default Tag;
