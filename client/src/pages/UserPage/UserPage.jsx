import classNames from "classnames/bind";
import styles from "./UserPage.module.css";

const cls = classNames.bind(styles);

import Info from "../../components/Info";
import { useParams } from "react-router-dom";

function UserPage() {

  const { id } = useParams()

  return (
    <div className={cls("wrapper")}>
      <Info userId={id} />
    </div>
  );
}

export default UserPage;
