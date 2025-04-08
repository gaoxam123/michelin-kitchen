import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import Leftbar from "../Leftbar";
import Rightbar from "../rightbar/rightbar";
import { auth } from "../../store/user";

import styles from "./Layout.module.css";
import classNames from "classnames/bind";
import { useCallback, useEffect } from "react";

const cls = classNames.bind(styles);

function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const authUser = useCallback(async () => {
    await dispatch(auth());
  }, [dispatch]);
  useEffect(() => {
    authUser();
  }, [authUser]);
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
