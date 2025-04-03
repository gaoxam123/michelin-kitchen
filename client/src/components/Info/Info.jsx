import apiRoutes from "../../config/apiRoutes";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollowed, removeFollowed } from "../../store/user";
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
  const [showFollowButton, setShowFollowButton] = useState(false)
  const [followed, setFollowed] = useState(false)

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {

      try {
        const userResponse = await request.get(`${apiRoutes.users.base}/${userId}`);
        setViewedUser(userResponse.data);
        const blogsResponse = await request.get(`${apiRoutes.users.base}/${userId}${apiRoutes.blogs.base}`);
        setBlogs(blogsResponse.data);
      } catch (error) {
        // TODO handle error
        alert(error)
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    setShowFollowButton(user && viewedUser && user.id !== viewedUser.id)
    setFollowed(following.includes(viewedUser.id)
    )
  }, [viewedUser])


  const handleFollowClick = () => {
    if (followed) {
      dispatch(
        removeFollowed({ followerId: user.id, followedId: viewedUser.id })
      );
    } else {
      dispatch(
        addFollowed({ followerId: user.id, followedId: viewedUser.id })
      );
    }
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
            <p className={cls("num")}>{viewedUser.following.length}</p> Following
          </div>
          <div className={cls("follows")}>
            <p className={cls("num")}>{viewedUser.followers.length}</p> Followers
          </div>
        </div>
      </div>
      <Feed blogs={blogs} />
    </div>
  );
}
