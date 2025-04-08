import UserForm from "../../components/UserForm"
import ChangeCredentialsForm from "../../components/ChangeCredentialsForm/ChangeCredentialsForm"

import styles from "./Settings.module.css"
import classNames from "classnames/bind"

const cls = classNames.bind(styles)

function Settings() {
    return (<>
        <UserForm />
    </>)
}

export default Settings
