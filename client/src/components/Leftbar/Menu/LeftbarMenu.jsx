import styles from "./LeftbarMenu.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

function Menu({ children }) {
    return <nav>
        {children}
    </nav>
}

export default Menu
