import SingleBlog from "../SingleBlog";
import request from "../../utils/request";
import apiRoutes from "../../config/apiRoutes";

import classNames from "classnames/bind";
import styles from "./Feed.module.css";
import { useCallback, useEffect, useState } from "react";
import CreateBlog from "../CreateBlog/CreateBlog";
import { useSelector } from "react-redux";

const cls = classNames.bind(styles);

export default function Feed({ initBlogs }) {
  const [blogs, setBlogs] = useState(initBlogs);
  const { user } = useSelector((state) => state.user);
  const fetchBlogs = useCallback(async () => {
    try {
      const blogsResponse = await request.get(`${apiRoutes.blogs.base}`);
      setBlogs(blogsResponse.data);
    } catch (error) {
      alert(error);
    }
  }, []);
  useEffect(() => {
    if (!blogs) fetchBlogs();
  }, [fetchBlogs, blogs]);
  return (
    <div className={cls("feed")}>
      {user && <CreateBlog />}
      <div className={cls("feed-wrapper")}>
        {blogs &&
          blogs.map((blog) => (
            <SingleBlog
              key={blog.id}
              blogId={blog.id}
              userId={blog.userId}
              content={blog.content}
              blogDate={blog.blogDate}
              imageBase64={blog.imageBase64}
            />
          ))}
      </div>
    </div>
  );
}
