import styles from "./BlogWithComment.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

import Form from "../../components/Form"

export default function BlogWithComment() {
    return <div className={cls("wrapper")}>
        <Form />
    </div>
}
