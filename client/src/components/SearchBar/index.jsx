import Tippy from "@tippyjs/react/headless"
import Popper from '../Popper'
import ProfileListItem from "../ProfileListItem"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useState, useRef, useEffect } from "react"

import classNames from "classnames/bind"
import styles from './SearchBar.module.css'

// TODO: Change API
const SEARCH_API = "https://dummyjson.com/users/search"

const cls = classNames.bind(styles)

function SearchBar({ placeholder }) {
    const [loading, setLoading] = useState(false)
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        setLoading(true)

        const query = encodeURIComponent(searchValue.trim())

        if (query) {
            fetch(`${SEARCH_API}?q=${query}`)
                .then(res => res.json())
                .then(res => setSearchResults(res.users))
        } else {
            setSearchResults([])
        }

        setTimeout(() => setLoading(false), 200)
    }, [searchValue])

    const inputRef = useRef()

    return (
        <Tippy
            interactive
            visible={showSearchResults && searchResults.length > 0}
            render={attrs => (
                <div className={cls("search-result")} tabIndex="-1" {...attrs}>
                    <Popper>
                        {/* TODO: slice(0, 10) -> API returning maximum 10 accounts */}
                        {searchResults.slice(0, 10).map((user) => (
                            <ProfileListItem
                                key={user.id}
                                profileImage={user.image}
                                displayName={`${user.firstName} ${user.lastName}`}
                                to={`/user/${user.id}`}
                            />
                        ))}
                    </Popper>
                </div>
            )}
            placement="bottom"
            onClickOutside={() => setShowSearchResults(false)}
        >
            <div className={cls("searchbar")}>
                <input
                    ref={inputRef}
                    placeholder={placeholder}
                    className={cls("search-input")}
                    onFocus={() => setShowSearchResults(true)}
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                />

                {searchValue && !loading &&
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        className={cls("clear-input")}
                        onClick={() => {
                            setSearchValue('')
                            inputRef.current.focus()
                        }}
                    />
                }

                {loading && <FontAwesomeIcon
                    icon={faSpinner}
                    className={cls("loading-icon")}
                />}

                <div className={cls("search-btn", { active: searchValue })}                >
                    <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                    />
                </div>
            </div>
        </Tippy>
    )
}

export default SearchBar
