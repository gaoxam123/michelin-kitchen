import { Button } from "@mui/material"
import "./sidebar.css"
import { Bookmark, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline, Event } from "@mui/icons-material"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <ul className="sidebar-list">
                    <li className="sidebar-list-item">
                        <RssFeed className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">Feed</span>
                    </li>
                    <li className="sidebar-list-item">
                        <PlayCircleFilledOutlined className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">Videos</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Group className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">Groups</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Bookmark className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">Bookmarks</span>
                    </li>
                    <li className="sidebar-list-item">
                        <HelpOutline className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">QA</span>
                    </li>
                    <li className="sidebar-list-item">
                        <WorkOutline className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">Work</span>
                    </li>
                    <li className="sidebar-list-item">
                        <Event className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">Events</span>
                    </li>
                    <li className="sidebar-list-item">
                        <School className="sidebar-icon"/>
                        <span className="sidebar-list-item-text">Courses</span>
                    </li>
                </ul>
                <Button className="sidebar-button">Show more</Button>
                <hr className="sidebar-hr"/>
                <ul className="sidebar-friend-list">
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                    <li className="sidebar-friend">
                        <img src="profile_pics.jpg" alt="" className="sidebar-friend-img" />
                        <span className="sidebar-friend-name">Name</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}