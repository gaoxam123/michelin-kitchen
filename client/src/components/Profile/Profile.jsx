import classNames from "classnames/bind"
import styles from './Profile.module.css'
import SingleBlog from "../SingleBlog"
import Feed from "../Feed"

const cls = classNames.bind(styles)

export default function Profile({ user = null }) {
    // TODO: retrieve posts of the given user from database
    const resultBlogs = [
        <SingleBlog key={1}/>,
        <SingleBlog key={2}/>,
        <SingleBlog key={3}/>,
        <SingleBlog key={4}/>,
        <SingleBlog key={5}/>,
        <SingleBlog key={6}/>
    ]
    return <Feed blogs={resultBlogs}/>
}