import { Button } from "@mui/material"
import "./leftbar.css"
import ProfileListItem from "../ProfileListItem"
import { Bookmark, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline, Event } from "@mui/icons-material"

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

    return (
        <div className="leftbar">
            <div className="leftbar-wrapper">
                <ul className="leftbar-list">
                    {items.map(
                        item => {
                            const Component = Icons[item.icon]
                            return (
                                <li key={item.icon} className="leftbar-list-item">
                                    <Component className="leftbar-icon" />
                                    <span className="leftbar-list-item-text">{item.title}</span>
                                </li>
                            )
                        }
                    )}
                </ul>
                <Button className="leftbar-button">Show more</Button>
                <hr className="leftbar-hr" />
                <div className="leftbar-friend-list">
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                    <ProfileListItem profileImage={"profile_pics.jpg"} displayName="Name" />
                </div>
            </div>
        </div>
    )
}
