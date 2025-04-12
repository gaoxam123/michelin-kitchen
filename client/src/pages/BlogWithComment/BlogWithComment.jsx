import SingleBlog from "../../components/SingleBlog";
import CommentSection from "../../components/CommentSection/CommentSection";

import classNames from "classnames/bind";
import styles from "./BlogWithComment.module.css";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { fetchBlogById } from "../../utils/blogHelperFunctions";

const cls = classNames.bind(styles);

export default function BlogWithComment() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = useCallback(async () => {
    const blogRespone = await fetchBlogById({ blogId: id });
    setBlog(blogRespone);
  }, [id]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (!blog)
    return <p>...Loading</p>;

  return (
    <div className={cls("wrapper")}>
      <SingleBlog
        blogId={id}
        userId={blog.userId}
        content={blog.content}
        blogDate={blog.blogDate}
        imageBase64={blog.imageBase64}
      />
      <CommentSection blogId={id} />
    </div>
  );
}
