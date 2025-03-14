import { Button } from "@mui/material"
import ProfileListItem from "../ProfileListItem"
import { Bookmark, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline, Event } from "@mui/icons-material"

import styles from "./Leftbar.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

const Icons = {
    Bookmark, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline, Event
}

export default function Leftbar() {
    const items = [
        {
            icon: 'RssFeed',
            title: 'Feed',
        },
        {
            icon: 'PlayCircleFilledOutlined',
            title: 'Video',
        },
        {
            icon: 'Group',
            title: 'Groups',
        },
        {
            icon: 'Bookmark',
            title: 'Bookmarks',
        },
        {
            icon: 'HelpOutline',
            title: 'QA',
        },
        {
            icon: 'WorkOutline',
            title: 'Work',
        },
        {
            icon: 'Event',
            title: 'Events',
        },
        {
            icon: 'School',
            title: 'Courses',
        },
    ]

    const renderItems = (items) => items.map(
        item => {
            const Component = Icons[item.icon]
            return (
                <li key={item.icon} className={cls("leftbar-list-item")}>
                    <Component className={cls("leftbar-icon")} />
                    <span className={cls("leftbar-list-item-text")}>{item.title}</span>
                </li>
            )
        }
    )

    return (
        <div className={cls("leftbar")}>
            <div className={cls("leftbar-wrapper")}>
                <ul className={cls("leftbar-list")}>
                    {renderItems(items)}
                </ul>
                <Button className={cls("leftbar-button")}>Show more</Button>
                <hr className={cls("leftbar-hr")} />
                <div className={cls("leftbar-friend-list")}>
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                </div>
            </div>
        </div>
    )
}
