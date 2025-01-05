import Homepage from "../pages/homepage/homepage";
import Blogs from "../pages/blogs/blogs";

export const publicRoutes = [
    { path: '/', component: Homepage },
    { path: '/blogs', component: Blogs },
    // Demo for other (possible) paths with different Layout
    // { path: '/search', component: Search, layout: SearchLayout }
]
