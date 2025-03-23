import { ChatBubbleOutline, SendOutlined, ThumbUpAlt, ThumbUpOffAlt } from "@mui/icons-material"
import { useState } from "react"

import CustomButton from '../CustomButton'
import ExpandableContent from "../ExpandableContent"
import { formatDate } from '../../utils/formatDate'
import Image from "../Image"

import classNames from "classnames/bind"
import styles from './SingleBlog.module.css'

const cls = classNames.bind(styles)

export default function SingleBlog({ username = "unknown", postDate = Date.now(), userFollowed = true, numLikes = 0, numComments = 0, numShares = 0 }) {

    const [likes, setLikes] = useState(numLikes)
    const [clickedLike, setClickedLike] = useState(false)
    const [comments, setComments] = useState(numComments)
    const [shares, setShares] = useState(numShares)

    const upLike = () => {
        if (clickedLike) {
            setLikes(prev => prev - 1)
            setClickedLike(false)
        }
        else {
            setLikes(prev => prev + 1)
            setClickedLike(true)
        }
    }

    return <div className={cls("wrapper")}>
        <div className={cls("header")}>
            <div className={cls("profile-picture")}>
                <Image src="TODO: Add image"/>
            </div>
            <div className={cls("username-date-follow")}>
                <div className={cls("username-follow")}>
                    <div className={cls("username")}>
                        {username}
                    </div>
                    <div className={cls("follow")}>
                        {userFollowed || "Follow"}
                    </div>
                </div>
                <div className={cls("date")}>
                    {formatDate(postDate)}
                </div>
            </div>
        </div>
        <div className={cls("caption")}>
            <ExpandableContent text={"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt ea aliquam minima ipsam aut vero alias quam dicta accusamus. Minus quis quia tempora doloribus. Consectetur adipisci facere ad tempore ratione!Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellendus nostrum accusantium asperiores, facere, suscipit libero explicabo quia qui ex aspernatur, ea harum voluptatem. A repellat sapiente aliquam corporis totam?"} />
        </div>
        <div className={cls("image")}>
            <Image src="TODO: add image" />
        </div>
        <div className={cls("likes-comments-shares")}>
            <div className={cls("likes")}>
                <ThumbUpOffAlt /> <p>{likes}</p>
            </div>
            <div className={cls("comments-shares")}>
                <div className={cls("comments")}>
                    {comments} comments
                </div>
                <div className={cls("shares")}>
                    {shares} shares
                </div>
            </div>
        </div>
        <div className={cls("buttons")}>
            <CustomButton style={{ color: clickedLike ? "blue" : "black" }} onClick={upLike} icon={<ThumbUpAlt />} title="Like" />
            <CustomButton icon={<ChatBubbleOutline />} title={"Comment"} />
            <CustomButton icon={<SendOutlined />} title={"Share"} />
        </div>
    </div>
}