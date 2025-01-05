import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer"
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
      <div className="layout-footer">
        <Footer />
      </div>
    </div>
  )
}

export default Layout;
