import classNames from "classnames/bind";
import styles from "./Menu.module.css"
import Tippy from "@tippyjs/react/headless";
import Popper from "../../Popper";
import MenuIcon from '@mui/icons-material/Menu';

import React, { useState, useEffect, useRef } from "react";

const cls = classNames.bind(styles)

function Menu({ items }) {
    const [history, setHistory] = useState([items])
    const currentList = history[history.length - 1]
    const [activate, setActivate] = useState(false)

    return (
        <Tippy
            interactive
            visible={activate}
            placement="bottom-end"
            render={attrs => (
                <div className={cls("menu-list")} tabIndex="-1" {...attrs}>
                    <Popper>
                        {currentList.map((item, index) => {
                            let Component = 'div'

                            if (!!item.href) {
                                // TODO use router
                                Component = 'a'
                            }

                            return (
                                <Component key={index} className={cls('item')} href={item.href} onClick={() => {
                                    if (!!item.children) {
                                        setHistory(prev => [...prev, item.children])
                                    } else if (item.back) {
                                        setHistory(prev => prev.slice(0, -1))
                                    } else {
                                        // TODO
                                        alert('clicked on ' + item.title)
                                    }
                                }}>
                                    {item.title}
                                </Component>
                            )
                        })}
                    </Popper>
                </div>
            )}
            onHidden={() => setHistory(prev => prev.slice(0, 1))}
            onClickOutside={() => setActivate(false)}
        >
            <div className={cls("menu-btn")} onClick={() => setActivate(!activate)}>
                <MenuIcon />
            </div>
        </Tippy>
    )
}

export default Menu

