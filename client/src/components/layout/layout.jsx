import React from "react";
import Navbar from "../navbar/navbar";
import classes from "./layout.module.css"

function Layout({ children }) {
  return (
    <div className={classes.layout}>
      <div className={classes.layoutHeader}>
        <Navbar />
      </div>
      <div className="layout-content">
        {children}
      </div>
    </div>
  )
}

export default Layout;
