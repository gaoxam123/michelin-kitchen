import Tippy from "@tippyjs/react/headless";
import Popper from "../../Popper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import {  logout } from "../../../store/user";
import { useSelector } from "react-redux";

import React, { useState } from "react";

import classNames from "classnames/bind";
import styles from "./Menu.module.css";

const cls = classNames.bind(styles);

function Menu({ items }) {
  const [history, setHistory] = useState([items]);
  const currentList = history[history.length - 1];
  const [activate, setActivate] = useState(false);
  const user = useSelector((state) => state.user.user);

  return (
    <Tippy
      interactive
      visible={activate}
      placement="bottom-end"
      render={(attrs) => (
        <div className={cls("menu-list")} tabIndex="-1" {...attrs}>
          <Popper>
            {currentList.map((item, index) => {
              if (!user && item.to === "/") {
                return null;
              }
              let Component = "div";

              if (!!item.to) {
                // TODO use router
                Component = Link;
              }

              return (
                <Component
                  key={index}
                  className={cls("item")}
                  to={item.to}
                  onClick={() => {
                    if (!!item.children) {
                      setHistory((prev) => [...prev, item.children]);
                    } else if (item.back) {
                      setHistory((prev) => prev.slice(0, -1));
                    }

                    if (item.onClick) {
                      item.onClick();
                    }
                  }}
                >
                  {item.title}
                </Component>
              );
            })}
          </Popper>
        </div>
      )}
      onHidden={() => setHistory((prev) => prev.slice(0, 1))}
      onClickOutside={() => setActivate(false)}
    >
      <div className={cls("menu-btn")} onClick={() => setActivate(!activate)}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </div>
    </Tippy>
  );
}

export default Menu;
