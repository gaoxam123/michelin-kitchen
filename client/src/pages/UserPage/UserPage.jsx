import classNames from "classnames/bind";
import styles from "./UserPage.module.css";

const cls = classNames.bind(styles);

import Info from "../../components/Info";

function UserPage() {
  return (
    <div className={cls("wrapper")}>
      <Info />
    </div>
  );
}

export default UserPage;
