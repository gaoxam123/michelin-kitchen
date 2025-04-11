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
import { useNavigate, useLocation } from "react-router-dom";
import apiRoutes from "../../config/apiRoutes";
import {
  fetchCommentsByBlogId,
  getLikes,
  addLike,
  removeLike,
  deleteBlog,
} from "../../utils/blogHelperFunctions";

import { addFollowed, removeFollowed, getFollowed } from "../../store/user";
import { Link } from "react-router-dom";
import routes from "../../config/routes";

import { getProfilePictureURL } from "../../utils/getImages";

import classNames from "classnames/bind";
import styles from "./SingleBlog.module.css";
import request from "../../utils/request";

const cls = classNames.bind(styles);

export default function SingleBlog({
  // TODO: dirty testing, remove later
  blogId = "7193d391-f894-4833-8aed-bf45cdba7038",
  userId,
  content,
  blogDate,
  imageBase64,
}) {
  const dispatch = useDispatch();
  // const { blog, comments, likes } = useSelector((state) => state.blog);
  const [comments, setComents] = useState([]);
  const [likes, setLikes] = useState([]);
  const { user, following } = useSelector((state) => state.user);
  const [blogOwner, setBlogOwner] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchFollowed = async () => {
      if (user) {
        await dispatch(getFollowed({ userId: user.id }));
      }
    };
    if (blogId) {
      fetchFollowed();
    }
  }, [blogId, dispatch, user]);

  const fetchBlogDetails = useCallback(async () => {
    const fetchedLikes = await getLikes({ blogId });
    setLikes(fetchedLikes);
    const fetchedComments = await fetchCommentsByBlogId({ blogId });
    setComents(fetchedComments);
    const userResponse = await request.get(`${apiRoutes.users.base}/${userId}`);
    setBlogOwner(userResponse.data);
  }, [blogId, userId]);

  useEffect(() => {
    if (!blogId) return;
    fetchBlogDetails();
  }, [blogId, fetchBlogDetails]);

  if (!blogOwner) {
    return <p>...Loading</p>;
  }

  const liked = user && likes.map((like) => like.id).includes(user.id);
  const showFollowButton = user && blogOwner && user.id !== blogOwner.id;
  const followed = blogOwner && following.includes(blogOwner.id);

  const handleFollowClick = async () => {
    if (followed) {
      await dispatch(
        removeFollowed({ followerId: user?.id, followedId: blogOwner.id })
      );
    } else {
      await dispatch(
        addFollowed({ followerId: user?.id, followedId: blogOwner.id })
      );
    }
    await dispatch(getFollowed({ userId: user?.id }));
  };

  const upLike = async () => {
    if (liked) {
      await removeLike({ userId: user?.id, blogId });
    } else {
      await addLike({ userId: user?.id, blogId });
    }
    const fetchedLikes = await getLikes({ blogId });
    setLikes(fetchedLikes);
  };

  const handleDeleteBlog = async () => {
    await deleteBlog({
      blog: {
        id: blogId,
        userId,
        content,
        image: imageBase64,
      },
    });
    if (location.pathname.startsWith(`${routes.blog}`)) {
      navigate(routes.home, { replace: true });
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={cls("wrapper")}>
      <div className={cls("header")}>
        <Image
          className={cls("profile-picture")}
          src={getProfilePictureURL(user?.id)}
        />
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
            <div>
              {user && user.id === userId && (
                <Link
                  to={`${routes.blog}/${blogId}/edit`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  <CustomButton title={"Edit"} className={cls("edit-button")} />
                </Link>
              )}
            </div>
            <div>
              {user.id === userId && (
                <CustomButton
                  title={"Delete"}
                  onClick={handleDeleteBlog}
                  className={cls("delete-button")}
                />
              )}
            </div>
          </div>
          <div className={cls("date")}>{formatDate(blogDate)}</div>
        </div>
      </div>
      <div className={cls("caption")}>
        <ExpandableContent text={content} />
      </div>
      <div className={cls("image")}>
        <Image srcBase64={imageBase64} />
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
