import Header from "../Header";
import classes from "./layout.module.css"
import Leftbar from "../Leftbar";
import Rightbar from "../rightbar/rightbar";

import styles from "./layout.module.css"
import classNames from "classnames/bind";

const cls = classNames.bind(styles)

function Layout({ children }) {
  return (
    <div className={cls("layout")}>
      <div className={classes.layoutHeader}>
        <Header />
      </div>
      <div className={cls("layout-content")}>
        <Leftbar />
        {children}
        <Rightbar />
      </div>
    </div>
  )
}

export default Layout;
