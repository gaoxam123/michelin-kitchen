import { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import Custombutton from "../../../CustomButton"

import styles from "./LeftbarMenuItem.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

function MenuItem({ title, icon, to }) {
    const navRef = useRef()

    return <NavLink ref={navRef} to={to} className={elem => cls("menu-item", { active: elem.isActive })}>
        <Custombutton title={title} icon={icon} />
    </NavLink>
}

export default MenuItem
