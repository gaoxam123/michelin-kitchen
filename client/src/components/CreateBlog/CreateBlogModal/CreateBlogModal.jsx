import classNames from "classnames/bind";
import styles from "./CreateBlogModal.module.css";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Close } from "@mui/icons-material";
import CustomButton from "../../CustomButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import request from "../../../utils/request";
import apiRoutes from "../../../config/apiRoutes";
import routes from "../../../config/routes";

const cls = classNames.bind(styles);

// Validation Schema using Yup
const schema = yup.object().shape({
  userId: yup.string().required("User ID is required"),
  content: yup.string(),
  image: yup.mixed(),
});

export default function CreateBlogModal({ ref, setOpenModal, userId }) {
  const dialog = useRef();
  const imageInputRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Imperative handle for opening and closing the modal
  useImperativeHandle(ref, () => ({
    open() {
      setOpenModal(true);
      dialog.current.showModal();
    },
    close() {
      setOpenModal(false);
      dialog.current.close();
    },
  }));

  // Handle clicking outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
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
    if (!userId) {
      navigate(routes.login, {
        state: { from: location.pathname },
      });
      return;
    }

    if (!profilePicture && !data.content) {
      setMessage("Can't post empty blogs!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("content", data.content || "");
    if (profilePicture) {
      formData.append("image", profilePicture);
    }

    try {
      await request.post(`${apiRoutes.blogs.base}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Blog created successfully!");
      reset();
      setProfilePicture(null);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
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
            icon={<Close sx={{ fontSize: 20 }} />}
          />
        </form>
      </div>
      <div className={cls("form")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" value={userId} {...register("userId")} />

          <textarea placeholder="Write something..." {...register("content")} />
          {errors.content && (
            <p className={cls("error")}>{errors.content.message}</p>
          )}

          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.[0]) setProfilePicture(e.target.files[0]);
            }}
          />
          {errors.image && (
            <p className={cls("error")}>{errors.image.message}</p>
          )}

          {message && <div className={cls("message")}>{message}</div>}

          <CustomButton
            title={loading ? "Submitting..." : "Submit"}
            isButton
            className={cls("submit-button")}
            disabled={loading}
          />
        </form>
      </div>
    </dialog>
  );
}
