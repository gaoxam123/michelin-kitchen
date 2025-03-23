import { Link } from 'react-router-dom'

import Image from "../Image"

import classNames from "classnames/bind"
import styles from './ProfileListItem.module.css'

const cls = classNames.bind(styles)

function ProfileListItem({
    profileImage,
    displayName = "NONAME",
    to,
    onClick
}) {
    return <Link to={to} className={cls("wrapper")} onClick={onClick}>
        <Image src={profileImage} className={cls("profile-picture")} />
        <span className={cls("display-name")}>{displayName}</span>
    </Link>
}

export default ProfileListItem
