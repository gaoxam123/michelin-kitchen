import { Link } from 'react-router-dom'

import classNames from "classnames/bind"
import styles from './navbar.module.css'
import Menu from './Menu'
import CustomButton from "../CustomButton"
import SearchBar from "../SearchBar"

const cls = classNames.bind(styles)

import { Person, Chat, Notifications } from "@mui/icons-material"

const currentUser = null

function Navbar() {

  return (
    <div className={cls("navbar-container")}>
      <div className={cls("navbar-left")}>
        <Link className={cls("logo")} to="/">MichelinKitchen</Link>
      </div>
      <div className={cls("navbar-center")}>
        <SearchBar placeholder="Search" />
      </div>
      <div className={cls("navbar-right")}>
        {currentUser ? (
          <>
            <div className={cls("navbar-links")}>
              <span className={cls("navbar-link")}>Homepage</span>
              <span className={cls("navbar-link")}>Timeline</span>
            </div>
            <div className={cls("navbar-icons")}>
              <div className={cls("navbar-icon-item")}>
                <Person />
                <span className={cls("navbar-icon-badge")}>1</span>
              </div>
              <div className={cls("navbar-icon-item")}>
                <Chat />
                <span className={cls("navbar-icon-badge")}>1</span>
              </div>
              <div className={cls("navbar-icon-item")}>
                <Notifications />
                <span className={cls("navbar-icon-badge")}>1</span>
              </div>
            </div>
            <img src="profile_pics.jpg" alt="" className={cls("navbar-img")} />
          </>
        ) : (
          <>
            <div className={cls('login-btn')}>
              <CustomButton text="Log In"></CustomButton>
            </div>
            <div className={cls('signup-btn')}>
              <CustomButton text="Sign Up"></CustomButton>
            </div>
          </>
        )}
        <Menu items={
          [
            {
              icon: null,
              title: "Language",
              children:
                [
                  {
                    icon: null,
                    title: "Back",
                    back: true
                  },
                  {
                    icon: null,
                    title: "English"
                  },
                  {
                    icon: null,
                    title: "Tiếng Việt"
                  },
                  {
                    icon: null,
                    title: "Deutsch"
                  }
                ]
            },
            {
              icon: null,
              title: "Settings",
              href: "/settings"
            }
          ]} />
      </div>
    </div>
  )
}

export default Navbar