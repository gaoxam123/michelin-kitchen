import request from "../../utils/request"
import configRoutes from "../../config/routes"

import Tippy from "@tippyjs/react/headless"
import Popper from '../Popper'
import ProfileListItem from "../ProfileListItem"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import { useState, useRef, useEffect } from "react"
import useDebounce from "../../hooks/useDebounce"

import classNames from "classnames/bind"
import styles from './SearchBar.module.css'

const cls = classNames.bind(styles)

function SearchBar({ placeholder }) {
    // delay time before sending search request
    const SEARCH_BAR_DELAY = 200

    const [loading, setLoading] = useState(false)
    const [showSearchResults, setShowSearchResults] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const searchValueDebounce = useDebounce(searchValue, SEARCH_BAR_DELAY)

    useEffect(() => {
        setLoading(true)

        const query = encodeURIComponent(searchValueDebounce.trim())

        if (query) {
            const fetchAPI = async () => {
                const result = await request
                    .get('search', {
                        params: {
                            q: query
                        }
                    });
                setSearchResults(result.data.users)
            }
            fetchAPI();
        } else {
            setSearchResults([])
        }

        setTimeout(() => setLoading(false), 200)
    }, [searchValueDebounce])

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
                                to={`${configRoutes.profile}${user.id}`}
                                onClick={() => setShowSearchResults(false)}
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
