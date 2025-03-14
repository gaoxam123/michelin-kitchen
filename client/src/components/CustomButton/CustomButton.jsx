import classNames from "classnames/bind"
import styles from './CustomButton.module.css'

const cls = classNames.bind(styles)

export default function CustomButton({ icon, title = "NoText" }) {
    return (
        <div className={cls("wrapper")}>
            <div className={cls("button")}>
                {icon && (
                    <div className={cls("icon")}>
                        {icon}
                    </div>
                )}
                <span className={cls("title")}>{title}</span>
            </div>
        </div>
    )
}