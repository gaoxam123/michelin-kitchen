import Header from "../Header";
import Leftbar from "../Leftbar";
import Rightbar from "../rightbar/rightbar";

import styles from "./Layout.module.css";
import classNames from "classnames/bind";

const cls = classNames.bind(styles);

function Layout({ children }) {
  return (
    <div className={cls("layout")}>
      <Header />
      <div className={cls("layout-content")}>
        <Leftbar />
        <div className={cls("main-block")}>{children}</div>
        <Rightbar />
      </div>
    </div>
  );
}

export default Layout;
