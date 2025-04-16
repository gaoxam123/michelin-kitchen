import Menu from "./Menu";
import MenuItem from "./Menu/MenuItem";

import { getProfilePictureURL } from "../../utils/getImages";

import configRoutes from "../../config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import ProfileListItem from "../ProfileListItem";
import { useSelector } from "react-redux";

import styles from "./Leftbar.module.css";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import request from "../../utils/request";
import apiRoutes from "../../config/apiRoutes";
import routes from "../../config/routes";

const cls = classNames.bind(styles);

export default function Leftbar() {
  const { user: logginUser, following } = useSelector((state) => state.user);

  const [followedUsers, setFollowedUsers] = useState([])

  useEffect(() => {
    const fetchFollowedUsers = async (following) => {
      const users = await Promise.all(
        following.map(
          async id =>
            (await request.get(`${apiRoutes.users.base}/${id}`)).data
        )
      )

      setFollowedUsers(users);
    }

    fetchFollowedUsers(following);
  }, [following])

  const items = [
    {
      title: "Feed",
      icon: <FontAwesomeIcon icon={faHouse} />,
      to: configRoutes.home,
    },
    {
      title: "Settings",
      icon: <FontAwesomeIcon icon={faGear} />,
      to: configRoutes.settings,
    },
  ];

  const renderMenu = () => (
    <Menu>
      {items.map((item) => (
        <MenuItem
          key={item.title}
          title={item.title}
          to={item.to}
          icon={item.icon}
        />
      ))}
    </Menu>
  );

  return (
    <div className={cls("leftbar")}>
      <div className={cls("leftbar-wrapper")}>
        {renderMenu()}
        <hr className={cls("leftbar-hr")} />
        <h3>Following profiles</h3>
        <div className={cls("leftbar-friend-list")}>
          {followedUsers.map((user) => (
            <ProfileListItem
              key={user.id}
              profileImage={getProfilePictureURL(user.id)}
              displayName={user.username}
              to={`${routes.profile}/${user.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
