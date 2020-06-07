import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import { kebabCase } from 'lodash';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Bio from '../bio';
import config from '../../config/blog-config';
import styles from './index.module.scss';

// export default function Footer({ isRoot }) {
export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { posts } = this.props;

    let postParts;

    if (posts) {
      // 記事情報のネスト構造を整理
      posts = posts.map((post) => post.node.fields);

      // カウンター
      let archiveCount = {};
      let categoryCount = {};
      let tagCount = {};

      for (let post of posts) {
        const date = moment(post.date);
        // const year = date.format('YYYY');
        const year = date.year();
        const key = date.format('YYYY/MM');
        if (year in archiveCount) {
          if (key in archiveCount[year]) {
            archiveCount[year][key]++;
          } else {
            archiveCount[year][key] = 1;
          }
        } else {
          archiveCount[year] = {};
          archiveCount[year][key] = 1;
        }

        const category = post.category;
        if (category in categoryCount) {
          categoryCount[category]++;
        } else {
          categoryCount[category] = 1;
        }

        const tags = post.tags;
        for (let tag of tags) {
          if (tag in tagCount) {
            tagCount[tag]++;
          } else {
            tagCount[tag] = 1;
          }
        }
      }

      postParts = (
        <div className={styles.columns}>
          <div className={styles.archives}>
            <h4>Archive</h4>
            {Object.keys(archiveCount).map((year) => {
              return (
                <ExpansionPanel
                  className={styles.expanel}
                  key={`expanel-${year}`}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    className={styles.expanel_summary}
                  >
                    {year}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul>
                      {Object.keys(archiveCount[year]).map((archive) => {
                        return (
                          <Link to={`/archive/${archive}`} key={archive}>
                            <li key={archive}>
                              {archive} [{archiveCount[year][archive]}]
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}
          </div>
          <div className={styles.categories}>
            <h4>Category</h4>
            <ul>
              {Object.keys(categoryCount).map((category) => {
                return (
                  <li key={category}>
                    <Link to={`/category/${kebabCase(category)}`}>
                      {category} [{categoryCount[category]}]
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.tags}>
            <h4>Tag</h4>
            <ul>
              <li>
                <Link to="/tag-list">タグ一覧</Link>
              </li>
            </ul>
          </div>
        </div>
      );
    }

    return (
      <footer className={styles.content} role="contentinfo">
        {postParts}
        <Bio />
        <div className={styles.copyright}>
          Copyright © 2013-{new Date().getFullYear()}. {config.blogAuthor}
        </div>
      </footer>
    );
  }
}
