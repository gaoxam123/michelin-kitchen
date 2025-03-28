import Image from "../Image";

import classNames from "classnames/bind";
import styles from "./Comment.module.css"

const cls = classNames.bind(styles)

function Comment({ avatar = "/profile_pics", name = "Test", text = "Hello World" }) {
    text = text.split("\n").map(
        (item, index) => (
            <>
                { item }
                { index !== text.split('\n').length - 1 && <br />}
            </>
        )
    )

return (
    <div className={cls("wrapper")}>
        <Image src={avatar} className={cls("avatar")} />
        <div className={cls("content")}>
            <strong>{name}</strong>
            <p>{text}</p>
        </div>
    </div >
)
}

export default Comment;
