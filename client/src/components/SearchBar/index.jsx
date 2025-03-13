import Tippy from "@tippyjs/react/headless"
import { Search, Close } from "@mui/icons-material"
import Popper from '../Popper'
import ProfileListItem from "../ProfileListItem"

import { useState, useRef } from "react"

import classNames from "classnames/bind"
import styles from './SearchBar.module.css'

const cls = classNames.bind(styles)

function SearchBar({ placeholder }) {
    const [inputFocus, setInputFocus] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const inputRef = useRef()

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
        <Tippy
            interactive
            visible={inputFocus && searchValue && searchResults.length > 0}
            render={attrs => (
                <div className={cls("search-result")} tabIndex="-1" {...attrs}>
                    <Popper>
                        {searchResults.map((profile, index) => (
                            <ProfileListItem key={index} profileImage={profile.imgSrc} displayName={profile.name} />
                        ))}
                    </Popper>
                </div>
            )}
        >
            <div className={cls("searchbar")}>
                <input
                    ref={inputRef}
                    placeholder={placeholder}
                    className={cls("search-input")}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                />
                {searchValue &&
                    <button
                        className={cls("clear-input")}
                        onClick={() => {
                            setSearchValue('')
                            inputRef.current.focus()
                        }}
                    >
                        <Close />
                    </button>
                }
                <button className={cls("search-btn", {
                    active: searchValue
                })}>
                    <Search />
                </button>
            </div>
        </Tippy>
    )
}

export default SearchBar
