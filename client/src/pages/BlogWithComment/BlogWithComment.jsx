import SingleBlog from "../../components/SingleBlog"
import CommentSection from "../../components/CommentSection/CommentSection"

import classNames from "classnames/bind"
import styles from "./BlogWithComment.module.css"

const cls = classNames.bind(styles)

export default function BlogWithComment() {
    return <div className={cls("wrapper")}>
        <SingleBlog />
        <CommentSection />
    </div>
}
