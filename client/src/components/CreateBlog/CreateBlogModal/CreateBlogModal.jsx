import classNames from "classnames/bind";
import styles from "./CreateBlogModal.module.css";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import CustomButton from "../../CustomButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import request from "../../../utils/request";
import apiRoutes from "../../../config/apiRoutes";
import { addBlog } from "../../../utils/blogHelperFunctions";

const cls = classNames.bind(styles);

const schema = yup.object().shape({
  userId: yup.string().required(),
  content: yup.string(),
});

export default function CreateBlogModal({ ref, setOpenModal, userId }) {
  const dialog = useRef();
  const imageInputRef = useRef();
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => {
    return {
      open() {
        setOpenModal(true);
        dialog.current.showModal();
      },
      close() {
        setOpenModal(false);
        dialog.current.close();
      },
    };
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log(event.current);
      if (dialog.current && event.target === dialog.current) {
        setOpenModal(false);
        dialog.current.close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenModal]);

  const onSubmit = async (data) => {
    if (!profilePicture && (data["content"] === "" || !data["content"])) {
      setMessage("Can't post empty blogs!");
      return;
    }
    dialog.current.close();
  };

  return (
    <dialog ref={dialog} className={cls("container")}>
      <div className={cls("header")}>
        <div className={cls("text")}>Create Blog</div>
        <form method="dialog" className={cls("close-form")}>
          <CustomButton
            title=""
            isButton
            onClick={() => setOpenModal(false)}
            className={cls("close-button")}
            icon={<Close sx={{ fontSize: 20, marginLeft: "25%" }} />}
          />
        </form>
      </div>
      <div className={cls("form")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("userId")} />
          <textarea placeholder="write something" {...register("content")} />
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setProfilePicture(e.target.files[0]);
            }}
          />
          {message && message}
          <CustomButton
            title="Submit"
            isButton
            className={cls("submit-button")}
          />
        </form>
      </div>
    </dialog>
  );
}
