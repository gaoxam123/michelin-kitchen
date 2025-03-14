import Feed from '../../components/Feed'
import Rightbar from '../../components/rightbar/rightbar'
import Leftbar from '../../components/Leftbar'
import "./homepage.css"

export default function Homepage() {
  return (
    <div className='home-container'>
      <Leftbar />
      <Feed />
      <Rightbar />
    </div>
  )
}
