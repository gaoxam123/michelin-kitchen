import "./navbar.css"
import { Search, Person, Chat, Notifications } from "@mui/icons-material"

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <span className="logo">DumbBlogs</span>
      </div>
      <div className="navbar-center">
        <div className="searchbar">
          <Search className="search-icon" />
          <input placeholder="Search for?" className="search-input" />
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-links">
          <span className="navbar-link">Homepage</span>
          <span className="navbar-link">Timeline</span>
        </div>
        <div className="navbar-icons">
          <div className="navbar-icon-item">
            <Person />
            <span className="navbar-icon-badge">1</span>
          </div>
          <div className="navbar-icon-item">
            <Chat />
            <span className="navbar-icon-badge">1</span>
          </div>
          <div className="navbar-icon-item">
            <Notifications />
            <span className="navbar-icon-badge">1</span>
          </div>
        </div>
        <img src="profile_pics.jpg" alt="" className="navbar-img" />
      </div>
    </div>
  )
}

export default Navbar