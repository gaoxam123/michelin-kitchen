import styles from "./BlogUpdate.module.css";
import classNames from "classnames/bind";

const cls = classNames.bind(styles);

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import { fetchBlogById, updateBlog } from "../../utils/blogHelperFunctions";
import routes from "../../config/routes";

const schema = yup.object().shape({
  id: yup.string().required("Blog ID is required"),
  userId: yup.string().required("User ID is required"),
  content: yup.string(),
  image: yup.mixed(),
});
export default function BlogUpdate() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const imageInputRef = useRef();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const fetchBlog = useCallback(async () => {
    const blogRespone = await fetchBlogById({ blogId: id });
    setBlog(blogRespone);
  }, [id]);
  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);
  useEffect(() => {
    if (blog) {
      reset({
        id: blog.id,
        userId: blog.userId,
        content: blog.content,
      });
    }
  }, [blog, reset]);
  if (!blog) return <p>...Loading</p>;
  const onSubmit = async (data) => {
    const detailsChanged = Object.keys(data).some(
      (key) => data[key] !== user[key]
    );

    if (!detailsChanged && !profilePicture) {
      setMessage("No changes made!");
      return;
    }

    if (!profilePicture && !data.content) {
      setMessage("Blogs can't be empty!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("userId", user.id);
    formData.append("content", data.content || "");
    if (profilePicture) {
      formData.append("image", profilePicture);
    } else {
      formData.append("image", blog.image);
    }

    try {
      await updateBlog(formData);

      alert("Blog updated successfully!");
      reset();
      setProfilePicture(null);
      imageInputRef.current.value = "";
      navigate(`${routes.blog}/${id}`, { replace: true });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cls("container")}>
      <div className={cls("header")}>
        <div className={cls("text")}>Update Blog</div>
      </div>
      <div className={cls("form")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />
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
    </div>
  );
}
