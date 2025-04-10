import classNames from "classnames/bind"
import styles from './Form.module.css'

import Image from "../Image"

const cls = classNames.bind(styles)

export default function Form({ handleSubmit, action, method, inputs = [], title, children, ...props }) {
    return <div className={cls("wrapper")} {...props}>
        <div className={cls("text")}><h2>{title}</h2></div>
        <div className={cls("form-container")}>
            <form onSubmit={handleSubmit} action={action} method={method}>
                {inputs.map(input => input)}
                {children}
            </form>
        </div>
    </div>
}
