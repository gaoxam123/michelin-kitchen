import classNames from "classnames/bind";
import styles from "./Info.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFollower, removeFollower } from "../../store/user";
import Image from "../Image";
import CustomButton from "../CustomButton";

const cls = classNames.bind(styles);

export default function Info({ userId }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const status = currentUser.status;

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) return <p>No user found</p>;

  let showFollowButton =
    currentUser.isAuthenticated && currentUser.id !== user.id;

  let followed = currentUser.following.some(
    (u) => u.username === user.username
  );

  const handleFollowClick = () => {
    if (followed) {
      dispatch(
        removeFollower({ followerId: currentUser.id, followedId: user.id })
      );
    } else {
      dispatch(
        addFollower({ followerId: currentUser.id, followedId: user.id })
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
            {user.firstName} {user.lastName}
          </p>
          <p className={cls("username")}>@{user.username}</p>
        </div>
        <div className={cls("follows-wrapper")}>
          <div className={cls("follows")}>
            <p className={cls("num")}>{user.following.length}</p> Following
          </div>
          <div className={cls("follows")}>
            <p className={cls("num")}>{user.followers.length}</p> Followers
          </div>
        </div>
      </div>
    </div>
  );
}
