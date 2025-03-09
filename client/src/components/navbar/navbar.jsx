import classNames from "classnames/bind"
import styles from './navbar.module.css'
import ProfileListItem from "../ProfileListItem"

const cls = classNames.bind(styles)

import { useState } from "react"
import { Search, Person, Chat, Notifications, Close } from "@mui/icons-material"
import Tippy from "@tippyjs/react/headless"
import Popper from '../Popper'

function Navbar() {

  const [inputFocus, setInputFocus] = useState(false)

  // TODO: dummy results for front end; setSearchResults should fetch results from database
  const [searchResults, setSearchResults] = useState([
    {
      imgSrc: "profile_pics.jpg",
      name: "dummy1"
    },
    {
      imgSrc: "profile_pics.jpg",
      name: "dummy2"
    }
  ])

  return (
    <div className={cls("navbar-container")}>
      <div className={cls("navbar-left")}>
        <span className={cls("logo")}>MichelinKitchen</span>
      </div>
      <div className={cls("navbar-center")}>
        <Tippy
          interactive
          visible={inputFocus && searchResults.length > 0}
          render={attrs => (
            <div className={cls("search-result")} tabIndex="-1" {...attrs}>
              <Popper>
                {searchResults.map(profile => (
                  <ProfileListItem profileImage={profile.imgSrc} displayName={profile.name} />
                ))}
              </Popper>
            </div>
          )}
        >
          <div className={cls("searchbar")}>
            <input placeholder="Search for?" className={cls("search-input")} onFocus={() => setInputFocus(true)} onBlur={() => setInputFocus(false)} />
            <button className={cls("clear-input")}>
              <Close />
            </button>
            <button className={cls("search-btn")}>
              <Search />
            </button>
          </div>
        </Tippy>
      </div>
      <div className={cls("navbar-right")}>
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
      </div>
    </div>
  )
}

export default Navbar