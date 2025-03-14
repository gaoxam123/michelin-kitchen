import classNames from "classnames/bind";
import styles from "./Popper.module.css";

const cls = classNames.bind(styles);

function Popper({ children, props }) {
    return <div className={cls("popper")} {...props}>{children}</div>;
}

export default Popper;
