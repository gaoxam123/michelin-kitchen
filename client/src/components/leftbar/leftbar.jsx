import { Button } from "@mui/material"
import "./leftbar.css"
import { Bookmark, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline, Event } from "@mui/icons-material"

export default function Leftbar() {
    return (
        <div className="leftbar">
            <div className="leftbar-wrapper">
                <ul className="leftbar-list">
                    <li className="leftbar-list-item">
                        <RssFeed className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">Feed</span>
                    </li>
                    <li className="leftbar-list-item">
                        <PlayCircleFilledOutlined className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">Videos</span>
                    </li>
                    <li className="leftbar-list-item">
                        <Group className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">Groups</span>
                    </li>
                    <li className="leftbar-list-item">
                        <Bookmark className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">Bookmarks</span>
                    </li>
                    <li className="leftbar-list-item">
                        <HelpOutline className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">QA</span>
                    </li>
                    <li className="leftbar-list-item">
                        <WorkOutline className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">Work</span>
                    </li>
                    <li className="leftbar-list-item">
                        <Event className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">Events</span>
                    </li>
                    <li className="leftbar-list-item">
                        <School className="leftbar-icon"/>
                        <span className="leftbar-list-item-text">Courses</span>
                    </li>
                </ul>
                <Button className="leftbar-button">Show more</Button>
                <hr className="leftbar-hr"/>
                <ul className="leftbar-friend-list">
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                    <li className="leftbar-friend">
                        <img src="profile_pics.jpg" alt="" className="leftbar-friend-img" />
                        <span className="leftbar-friend-name">Name</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
