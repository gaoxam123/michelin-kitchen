import Feed from '../../components/Feed'
import Rightbar from '../../components/rightbar/rightbar'
import Leftbar from '../../components/Leftbar'

import styles from "./Homepage.module.css"
import classNames from 'classnames/bind'

const cls = classNames.bind(styles)

export default function Homepage() {
  return (
    <div className={cls('home-container')}>
      <Leftbar />
      <Feed />
      <Rightbar />
    </div>
  )
}
