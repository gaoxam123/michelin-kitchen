import SingleBlog from "../SingleBlog"

import classNames from "classnames/bind"
import styles from "./Feed.module.css"

const cls = classNames.bind(styles)

export default function Feed({ blogs = [<SingleBlog key={1}/>] }) {
  return (
    <div className={cls("feed")}>
      <div className={cls("feed-wrapper")}>
        {blogs.map((blog) => blog)}
      </div>
    </div>
  )
}
