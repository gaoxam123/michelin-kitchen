import classNames from "classnames/bind"
import styles from './SingleBlog.module.css'
import CustomButton from '../CustomButton'
import { ChatBubbleOutline, SendOutlined, ThumbUpOffAlt } from "@mui/icons-material"
import ExpandableContent from "../ExpandableContent"
import { formatDate } from '../../utils/formatDate'
const cls = classNames.bind(styles)

export default function SingleBlog({ username = "unknown", postDate = Date.now(), userFollowed = true, numLikes = 100, numComments = 10, numShares = 23 }) {
    return <div className={cls("wrapper")}>
        <div className={cls("header")}>
            <div className={cls("profile-picture")}>
                <img src="profile_pics.jpg" />
            </div>
            <div className={cls("username-date-follow")}>
                <div className={cls("username-follow")}>
                    <div className={cls("username")}>
                        {username}
                    </div>
                    <div className={cls("follow")}>
                        {userFollowed && "Follow"}
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
            <img src="profile_pics.jpg" />
        </div>
        <div className={cls("likes-comments-shares")}>
            <div className={cls("likes")}>
                <ThumbUpOffAlt /> <p>{numLikes}</p>
            </div>
            <div className={cls("comments-shares")}>
                <div className={cls("comments")}>
                    {numComments} comments
                </div>
                <div className={cls("shares")}>
                    {numShares} shares
                </div>
            </div>
        </div>
        <div className={cls("buttons")}>
            <CustomButton icon={ThumbUpOffAlt} text="Like" />
            <CustomButton icon={ChatBubbleOutline} text={"Comment"} />
            <CustomButton icon={SendOutlined} text={"Share"} />
        </div>
    </div>
}