import styles from "./Settings.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

function Settings() {
    return (<h1 className={cls("test")}>Settings Page</h1>)
}

export default Settings
