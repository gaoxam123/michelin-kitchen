import classNames from "classnames/bind"
import styles from './Form.module.css'

const cls = classNames.bind(styles)

export default function Form({ handleSubmit, action, method, inputs = [], title, children, ...props }) {
    return <div className={cls("wrapper")} {...props}>
        <div className={cls("img-container")}>
            <img src="profile_pics.jpg"/>
        </div>
        <div className={cls("text")}><h2>{title}</h2></div>
        <div className={cls("form-container")}>
            <form onSubmit={handleSubmit} action={action} method={method}>
                {inputs.map(input => input)}
                {children}
            </form>
        </div>
    </div>
}
