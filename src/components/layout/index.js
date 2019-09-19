import React from 'react'
import styles from './index.module.scss'
import Header from '../header'
import Footer from '../footer'
import UserHeat from '../user-heat'

import '../../css/base.scss'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

export default class Layout extends React.Component {
  render() {
    const { location, children } = this.props

    return (
      <div className={styles.root_container}>
        <UserHeat />
        <Header location={location} />
        {children}
        <Footer />
      </div>
    )
  }
}
