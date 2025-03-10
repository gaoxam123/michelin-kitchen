import classNames from "classnames/bind"
import styles from './CustomButton.module.css'

const cls = classNames.bind(styles)

export default function CustomButton({ icon = null, text = null}) {
    const Icon = icon
    return <div className={cls("wrapper")}>
        <div className={cls("button")}>
            {icon !== null && <Icon/>} {text !== null && text}
        </div>
    </div>
}