import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer"
import classes from "./layout.module.css"

const Layout = () => {
  return (
    <div className={classes.layout}>
      <div className={classes.layoutHeader}>
        <Navbar />
      </div>
      <div className="layout-content">
        <Outlet />
      </div>
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Layout;
