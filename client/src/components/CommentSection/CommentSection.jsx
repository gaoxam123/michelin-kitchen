import Comment from "../Comment/Comment"
import Input from "../Input"
import CustomButton from "../CustomButton"

import classNames from "classnames/bind"
import styles from "./CommentSection.module.css"
import { useState } from "react"

const cls = classNames.bind(styles)

function CommentSection() {
    const [comments, setComments] = useState([
        {
            name: "Joel",
            avatar: "TODO",
            text: "Very cool comment"
        },
        {
            name: "Clem",
            avatar: "TODO",
            text: "Also very cool comment with\nLine break💫"
        },
    ])

    const [commentInput, setCommentInput] = useState("")

    const handlePost = () => {
        if (!commentInput.trim()) {
            return
        }

        // TODO: POST comments

        setCommentInput("")
        setComments([
            {
                name: "NewUser",
                avatar: "TODO",
                text: commentInput.trim(),
            },
            ...comments
        ])
    }

    const handleKeyDown = e => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handlePost()
        }
    }

    return (
        <div className={cls("wrapper")}>
            <h3>Comments (💡Use Shift + Enter for new line)</h3>

            <div className={cls("comment-input")}>
                <Input
                    componentType="textarea"
                    id="comment"
                    placeholder="Be creative 🌈"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    hideError
                />
                <CustomButton onClick={handlePost} title="POST" isButton />
            </div>

            <div className={cls("comments")}>
                {comments.map((comment, index) => {
                    return (
                        <Comment
                            key={index}
                            name={comment.name}
                            avatar={comment.avatar}
                            text={comment.text}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentSection
