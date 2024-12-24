import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer"
import "./layout.css"

const Layout = () => {
  return (
    <div className="layout">
      <div className="layout-header">
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