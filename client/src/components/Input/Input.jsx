import classNames from "classnames/bind"
import styles from './Input.module.css'

const cls = classNames.bind(styles)

export default function Input({ componentType, id, error, icon = "", ...props }) {
    const ComponentType = componentType
    return (
        <div className={cls("input-container")}>
            <div className={cls("input-wrapper")}>
                <label htmlFor={id}>{icon}</label>
                <ComponentType
                    {...props}
                    id={id} />
            </div>
            <div className={cls("control-error")}><p style={{ display: error ? "block" : "none"}}>{error}</p></div>
        </div>
    )
}
