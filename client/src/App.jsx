import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Homepage from './pages/homepage/homepage'
import Blogs from './pages/blogs/blogs'
import Layout from './components/layout/layout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Homepage />
      },
      {
        path: "/blogs",
        element: <Blogs />
      },
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App