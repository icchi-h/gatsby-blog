import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faFolder } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import Tag from '../tag';
import styles from './index.module.scss';
import config from '../../config/blog-config';

class PostMetaInfo extends React.Component {
  render() {
    const { category, tags, date, color } = this.props;
    const tagList = tags.map((tag) => <Tag key={tag} value={tag} />);
    const formattedDate = moment(date).format(config.dateFormat);

    return (
      <small className={styles.content}>
        <div className={styles.date} style={{ color: color }}>
          <FontAwesomeIcon color={color} icon={faCalendarAlt} size="sm" />
          {formattedDate}
        </div>
        <div className={styles.category}>
          <FontAwesomeIcon color={color} icon={faFolder} />
          <Link
            to={`/category/${kebabCase(category)}`}
            color={color}
            style={{ color: color }}
          >
            {category}
          </Link>
        </div>
        <div className={styles.tags}>{tagList}</div>
      </small>
    );
  }
}

export default PostMetaInfo;
