import Feed from '../../components/feed/feed'
import Rightbar from '../../components/rightbar/rightbar'
import Sidebar from '../../components/sidebar/sidebar'
import "./homepage.css"

function Homepage() {
  return (
    <div className='home-container'>
      <Sidebar />
      <Feed />
      <Rightbar />
    </div>
  )
}

export default Homepage