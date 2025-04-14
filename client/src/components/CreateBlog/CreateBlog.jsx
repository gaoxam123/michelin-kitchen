import classNames from "classnames/bind";
import styles from "./CreateBlog.module.css";

const cls = classNames.bind(styles);

import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import CreateBlogModal from "./CreateBlogModal/CreateBlogModal";
import CustomButton from "../CustomButton";
import Image from "../Image";
import { getProfilePictureURL } from "../../utils/getImages";
import routes from "../../config/routes";

export default function CreateBlog() {
  const { user } = useSelector((state) => state.user);

  const [openModal, setOpenModal] = useState(false);

  const dialog = useRef();

  const handleOpenModal = () => {
    dialog.current.open();
  };

  useEffect(() => {
    if (openModal) {
      document.body.classList.add(cls("noScroll"));
    } else {
      document.body.classList.remove(cls("noScroll"));
    }
    return () => {
      document.body.classList.remove(cls("noScroll"));
    };
  }, [openModal]);

  return (
    <>
      <CreateBlogModal
        ref={dialog}
        setOpenModal={setOpenModal}
        userId={user ? user.id : null}
      />
      <div className={cls("wrapper")}>
        <Image
          src={user ? getProfilePictureURL(user.id) : null}
          className={cls("img")}
          to={user ? `${routes.profile}/${user.id}` : routes.login}
        />
        <CustomButton
          onClick={handleOpenModal}
          title="Create new blog"
          style={{ color: "gray" }}
          className={cls("modal-button")}
        />
      </div>
    </>
  );
}
