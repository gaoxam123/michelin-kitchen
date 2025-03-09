import classNames from "classnames/bind";
import styles from "./Popper.module.css";

const cls = classNames.bind(styles);

function Popper({ children }) {
    return <div className={cls("popper")}>{children}</div>;
}

export default Popper;
