import classNames from "classnames/bind";
import styles from "./CreateBlogModal.module.css";
import { useEffect, useImperativeHandle, useRef, useState } from "react";
import { Close } from "@mui/icons-material";
import CustomButton from "../../CustomButton";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { addBlog } from "../../../utils/blogHelperFunctions";

const cls = classNames.bind(styles);

// Validation Schema using Yup
const schema = yup.object().shape({
  userId: yup.string().required("User ID is required"),
  content: yup.string(),
  image: yup.mixed(),
});

export default function CreateBlogModal({ ref, setOpenModal }) {
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
  const { user } = useSelector((state) => state.user);

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

  useEffect(() => {
    reset({
      userId: user ? user.id : null,
    });
  }, [user, reset]);

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
    if (!profilePicture && !data.content) {
      setMessage("Can't post empty blogs!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("content", data.content?.trim() || "");
    if (profilePicture) {
      formData.append("image", profilePicture);
    }

    try {
      await addBlog(formData);

      alert("Blog created successfully!");
      reset();
      setProfilePicture(null);
      imageInputRef.current.value = "";
      window.location.reload();
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
          <input type="hidden" {...register("userId")} />

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
