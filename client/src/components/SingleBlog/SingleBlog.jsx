import {
  ChatBubbleOutline,
  ThumbUpAlt,
  ThumbUpOffAlt,
} from "@mui/icons-material";

import CustomButton from "../CustomButton";
import ExpandableContent from "../ExpandableContent";
import { formatDate } from "../../utils/formatDate";
import Image from "../Image";
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiRoutes from "../../config/apiRoutes";
import {
  fetchBlogById,
  fetchCommentsByBlogId,
  getLikes,
  addLike,
  removeLike,
} from "../../store/blog";

import { addFollowed, removeFollowed, getFollowed } from "../../store/user";
import { Link } from "react-router-dom";
import routes from "../../config/routes";

import classNames from "classnames/bind";
import styles from "./SingleBlog.module.css";
import request from "../../utils/request";

const cls = classNames.bind(styles);

export default function SingleBlog({
  // TODO: dirty testing, remove later
  blogId = "7193d391-f894-4833-8aed-bf45cdba7038",
}) {
  const dispatch = useDispatch();
  const { blog, comments, likes } = useSelector((state) => state.blog);
  const { user, following } = useSelector((state) => state.user);
  const [blogOwner, setBlogOwner] = useState(null);

  useEffect(() => {
    const tmp = async () => {
      dispatch(fetchBlogById({ blogId }));
      if (user) {
        await dispatch(getFollowed({ userId: user.id }));
      }
    };
    if (blogId) {
      tmp();
    }
  }, [blogId, dispatch, user]);

  const fetchBlog = useCallback(async () => {
    dispatch(getLikes({ blogId }));
    dispatch(fetchCommentsByBlogId({ blogId }));
    const userResponse = await request.get(
      `${apiRoutes.users.base}/${blog.userId}`
    );
    setBlogOwner(userResponse.data);
  }, [blogId, dispatch, blog]);

  useEffect(() => {
    if (!blogId || !blog) return;
    fetchBlog();
  }, [blogId, dispatch, fetchBlog, blog]);

  const liked = user && blog && likes.map((like) => like.id).includes(user.id);
  const showFollowButton = user && blogOwner && user.id !== blogOwner.id;
  const followed = blogOwner && following.includes(blogOwner.id);

  if (!blog || !blogOwner) {
    return <p>...Loading</p>;
  }

  // console.log(blog);

  const handleFollowClick = async () => {
    if (followed) {
      await dispatch(
        removeFollowed({ followerId: user.id, followedId: blogOwner.id })
      );
    } else {
      await dispatch(
        addFollowed({ followerId: user.id, followedId: blogOwner.id })
      );
    }
    await dispatch(getFollowed({ userId: user.id }));
  };

  const upLike = async () => {
    if (liked) {
      await dispatch(removeLike({ userId: user.id, blogId }));
    } else {
      await dispatch(addLike({ userId: user.id, blogId }));
    }
    await dispatch(getLikes({ blogId }));
  };

  return (
    <div className={cls("wrapper")}>
      <div className={cls("header")}>
        <Image className={cls("profile-picture")} src="TODO: Add image" />
        <div className={cls("username-date-follow")}>
          <div className={cls("username-follow")}>
            <div className={cls("username")}>
              <Link
                to={
                  blogOwner.id
                    ? `${routes.profile}/${blogOwner.id}`
                    : `${routes.home}`
                }
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  font: "inherit",
                  padding: "0",
                  margin: "0",
                }}
              >
                {blogOwner.username}
              </Link>
            </div>
            <div>
              {showFollowButton && (
                <CustomButton
                  title={followed ? "Unfollow" : "Follow"}
                  onClick={handleFollowClick}
                  className={cls("follow-button")}
                />
              )}
            </div>
          </div>
          <div className={cls("date")}>{formatDate(blog.blogDate)}</div>
        </div>
      </div>
      <div className={cls("caption")}>
        <ExpandableContent text={blog.content} />
      </div>
      <div className={cls("image")}>
        <Image src="TODO: add image" />
      </div>
      <div className={cls("likes-comments-shares")}>
        <div className={cls("likes")}>
          <ThumbUpOffAlt /> <p>{likes.length}</p>
        </div>
        <div className={cls("comments-shares")}>
          <div className={cls("comments")}>{comments.length} comments</div>
        </div>
      </div>
      <div className={cls("buttons")}>
        <CustomButton
          style={{ color: liked ? "blue" : "black" }}
          onClick={upLike}
          icon={<ThumbUpAlt />}
          title="Like"
        />
        <CustomButton icon={<ChatBubbleOutline />} title={"Comment"} />
      </div>
    </div>
  );
}
