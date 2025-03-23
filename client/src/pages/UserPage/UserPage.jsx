import classNames from "classnames/bind"
import styles from './UserPage.module.css'

const cls = classNames.bind(styles)

import Profile from "../../components/Profile"

function UserPage() {
    return <div className={cls("wrapper")}>
        <Profile />
    </div>
}

export default UserPage;
