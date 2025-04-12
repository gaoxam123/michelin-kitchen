import Comment from "../Comment/Comment"
import Input from "../Input"
import CustomButton from "../CustomButton"

import { fetchCommentsByBlogId, addComment } from "../../utils/blogHelperFunctions"
import { useSelector } from "react-redux"

import classNames from "classnames/bind"
import styles from "./CommentSection.module.css"
import { useEffect, useState } from "react"

const cls = classNames.bind(styles)

function CommentSection({ blogId }) {
    const { user } = useSelector(state => state.user);

    const [comments, setComments] = useState([]);

    const [commentInput, setCommentInput] = useState("")

    useEffect(() => {
        if (!blogId) {
            return;
        }

        const fetchComments = async (blogId) => {
            const response = await fetchCommentsByBlogId({ blogId });
            setComments(response);
        }
        fetchComments(blogId);
    }, [blogId]);

    const handlePost = async () => {
        if (!commentInput.trim()) {
            return
        }

        try {
            const newComment = {
                userId: user.id,
                blogId: blogId,
                content: commentInput.trim(),
            };

            await addComment(newComment);

            setCommentInput("");
            setComments([newComment, ...comments]);
        } catch (e) {
            alert(e);
        }
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
                            content={comment.content}
                            userId={comment.userId}
                            commentDate={comment.commentDate}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default CommentSection
