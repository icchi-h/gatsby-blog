import React from 'react';
import styles from './index.module.scss';
import Header from '../header';
import Footer from '../footer';

import '../../css/base.scss';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

export default class Layout extends React.Component {
  render() {
    const { location, children, posts } = this.props;

    return (
      <div className={styles.root_container}>
        <Header location={location} />
        {children}
        <Footer posts={posts} />
      </div>
    );
  }
}
