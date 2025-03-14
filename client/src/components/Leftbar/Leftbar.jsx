import Menu from "./Menu"
import MenuItem from "./Menu/MenuItem"

import configRoutes from "../../config/routes"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUserGroup, faBookmark, faGear } from '@fortawesome/free-solid-svg-icons'

import { Button } from "@mui/material"
import ProfileListItem from "../ProfileListItem"

import styles from "./Leftbar.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

export default function Leftbar() {
    const items = [
        {
            title: 'Feed',
            icon: <FontAwesomeIcon icon={faHouse} />,
            to: configRoutes.home,
        },
        {
            title: 'Settings',
            icon: <FontAwesomeIcon icon={faGear} />,
            to: configRoutes.settings,
        },
        {
            title: 'Groups',
            icon: <FontAwesomeIcon icon={faUserGroup} />,
            to: "/TODO"
        },
        {
            title: 'Bookmarks',
            icon: <FontAwesomeIcon icon={faBookmark} />,
            to: "TODO"
        },
    ]

    const renderMenu = () => (
        <Menu>
            {items.map(item => (
                <MenuItem key={item.title} title={item.title} to={item.to} icon={item.icon} />
            ))}
        </Menu>
    )

    return (
        <div className={cls("leftbar")}>
            <div className={cls("leftbar-wrapper")}>
                {renderMenu()}

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
