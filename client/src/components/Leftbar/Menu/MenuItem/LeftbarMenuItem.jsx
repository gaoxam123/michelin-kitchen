import { NavLink } from 'react-router-dom'
import Custombutton from "../../../CustomButton"

import styles from "./LeftbarMenuItem.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

function MenuItem({ title, icon, to }) {
    return <NavLink to={to} className={cls("menu-item")}>
        <Custombutton title={title} icon={icon} />
    </NavLink>
}

export default MenuItem
