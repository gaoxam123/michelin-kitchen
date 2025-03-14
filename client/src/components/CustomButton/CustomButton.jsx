import classNames from "classnames/bind"
import styles from './CustomButton.module.css'

const cls = classNames.bind(styles)

export default function CustomButton({ icon, title = "NoText", active = false }) {
    return (
        <div className={cls("wrapper")}>
            <div className={cls("button", { active: active })}>
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