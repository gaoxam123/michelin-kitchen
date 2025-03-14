import SingleBlog from "../SingleBlog"

import classNames from "classnames/bind"
import styles from "./Feed.module.css"

const cls = classNames.bind(styles)

export default function Feed() {
  return (
    <div className={cls("feed")}>
      <div className={cls("feed-wrapper")}>
        <SingleBlog />
      </div>
    </div>
  )
}
