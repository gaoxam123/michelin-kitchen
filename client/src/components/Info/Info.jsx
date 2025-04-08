import apiRoutes from "../../config/apiRoutes";

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowed, removeFollowed, getFollowed } from "../../store/user";
import Image from "../Image";
import CustomButton from "../CustomButton";
import Feed from "../Feed";
import request from "../../utils/request";

import classNames from "classnames/bind";
import styles from "./Info.module.css";

const cls = classNames.bind(styles);

export default function Info({ userId }) {
  const dispatch = useDispatch();
  const { user, following, status, error } = useSelector((state) => state.user);
  const [viewedUser, setViewedUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [followedList, setFollowedList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  const fetchUser = useCallback(async () => {
    try {
      const userResponse = await request.get(
        `${apiRoutes.users.base}/${userId}`
      );
      setViewedUser(userResponse.data);
      const blogsResponse = await request.get(
        `${apiRoutes.users.base}/${userId}${apiRoutes.blogs.base}`
      );
      setBlogs(blogsResponse.data);
      // TODO: apiRoutes
      const followedResponse = await request.get(`/users/${userId}/followed`);
      setFollowedList(followedResponse.data);
      const followerResponse = await request.get(`/users/${userId}/followers`);
      setFollowerList(followerResponse.data);
    } catch (error) {
      // TODO handle error
      alert(error);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    fetchUser();
  }, [userId, fetchUser]);

  useEffect(() => {
    if (user) {
      dispatch(getFollowed({ userId: user.id }));
    }
  }, [user, dispatch]);

  const showFollowButton = user && viewedUser && user.id !== viewedUser.id;
  const followed = viewedUser && following.includes(viewedUser.id);

  if (!viewedUser) {
    return <p>...Loading</p>;
  }

  const handleFollowClick = async () => {
    if (followed) {
      await dispatch(
        removeFollowed({ followerId: user.id, followedId: viewedUser.id })
      );
    } else {
      await dispatch(
        addFollowed({ followerId: user.id, followedId: viewedUser.id })
      );
    }
    await fetchUser();
    await dispatch(getFollowed({ userId: user.id }));
  };

  return (
    <div className={cls("container")}>
      <div className={cls("pictures-and-buttons")}>
        <div className={cls("images")}>
          <div className={cls("background-image-wrapper")}></div>
          <div className={cls("profile-image-wrapper")}>
            <Image className={cls("profile-image")} />
          </div>
        </div>
        <div className={cls("buttons")}>
          {showFollowButton && (
            <CustomButton
              title={followed ? "Unfollow" : "Follow"}
              onClick={handleFollowClick}
              className={cls("follow-button")}
              disabled={status === "loading"}
            />
          )}
        </div>
      </div>
      <div className={cls("infos")}>
        <div className={cls("names")}>
          <p className={cls("name")}>
            {viewedUser.firstName} {viewedUser.lastName}
          </p>
          <p className={cls("username")}>@{viewedUser.username}</p>
        </div>
        <div className={cls("follows-wrapper")}>
          <div className={cls("follows")}>
            <p className={cls("num")}>{followedList.length}</p> Following
          </div>
          <div className={cls("follows")}>
            <p className={cls("num")}>{followerList.length}</p> Followers
          </div>
        </div>
      </div>
      <Feed initBlogs={blogs} />
    </div>
  );
}
