import { defaultProfilePicture } from "../../config/imagesPaths";

import { Link, useNavigate } from "react-router-dom";
import configRoutes from "../../config/routes";

import { logout } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames/bind";
import styles from "./Header.module.css";
import Menu from "./Menu";
import CustomButton from "../CustomButton";
import SearchBar from "../SearchBar";

import Image from "../Image";
import { getProfilePictureURL } from "../../utils/getImages";

const cls = classNames.bind(styles);

import { Person, Chat, Notifications } from "@mui/icons-material";

function Header() {
  const navigate = useNavigate();

  const { user, status, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const menuItems = [
    {
      icon: null,
      title: "Language",
      children: [
        {
          icon: null,
          title: "Back",
          back: true,
        },
        {
          icon: null,
          title: "English",
        },
        {
          icon: null,
          title: "Tiếng Việt",
        },
        {
          icon: null,
          title: "Deutsch",
        },
      ],
    },
    {
      icon: null,
      title: "Settings",
      to: "/settings",
    },
    {
      icon: null,
      title: "Logout",
      to: "/",
      onClick: () => {
        dispatch(logout());
      },
    },
  ];

  return (
    <div className={cls("header-container")}>
      <div className={cls("header-left")}>
        <Link className={cls("logo")} to={configRoutes.home}>
          MichelinKitchen
        </Link>
      </div>
      <div className={cls("header-center")}>
        <SearchBar placeholder="Search" />
      </div>
      <div className={cls("header-right")}>
        {user ? (
          <>
            <div className={cls("header-links")}>
              <span className={cls("header-link")}>
                <Link
                  to={configRoutes.home}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Homepage
                </Link>
              </span>
              <span className={cls("header-link")}>
                <Link
                  to={
                    user
                      ? `${configRoutes.profile}/${user.id}`
                      : configRoutes.home
                  }
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    font: "inherit",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Timeline
                </Link>
              </span>
            </div>
            <div className={cls("header-icons")}>
              <div className={cls("header-icon-item")}>
                <Person />
                <span className={cls("header-icon-badge")}>1</span>
              </div>
              <div className={cls("header-icon-item")}>
                <Chat />
                <span className={cls("header-icon-badge")}>1</span>
              </div>
              <div className={cls("header-icon-item")}>
                <Notifications />
                <span className={cls("header-icon-badge")}>1</span>
              </div>
            </div>
            <Image
              src={getProfilePictureURL(user.id)}
              className={cls("header-img")}
              to={`/profile/${user.id}`}
            />
          </>
        ) : (
          <>
            <div className={cls("login-btn")}>
              <CustomButton
                title="Log In"
                onClick={() =>
                  navigate(configRoutes.login, {
                    state: { from: location.pathname },
                  })
                }
              />
            </div>
            <div className={cls("signup-btn")}>
              <CustomButton
                title="Sign Up"
                onClick={() => navigate(configRoutes.register)}
              />
            </div>
          </>
        )}
        <Menu items={menuItems} />
      </div>
    </div>
  );
}

export default Header;

// (<>
//   <div className={cls('login-btn')} onClick={() => dispatch(userActions.logout())}>
//     <CustomButton title='Log Out'/>
//   </div></>)
