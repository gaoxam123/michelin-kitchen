import { Link } from 'react-router-dom'

import classNames from "classnames/bind"
import styles from './ProfileListItem.module.css'

const cls = classNames.bind(styles)

function ProfileListItem({ profileImage = "profile_pics.jpg", displayName = "NONAME", to }) {
    return <Link to={to} className={cls("wrapper")}>
        <img src={profileImage} className={cls("profile-picture")} />
        <span className={cls("display-name")}>{displayName}</span>
    </Link>
}

export default ProfileListItem