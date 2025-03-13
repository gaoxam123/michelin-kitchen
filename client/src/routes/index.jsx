import Homepage from "../pages/homepage/homepage";
import Blogs from "../pages/blogs/blogs";
import UserPage from "../pages/UserPage"

export const publicRoutes = [
    { path: '/', component: Homepage },
    { path: '/blogs', component: Blogs },
    { path: '/user/:id', component: UserPage }
    // Demo for other (possible) paths with different Layout
    // { path: '/search', component: Search, layout: SearchLayout }
]
