import Homepage from "../pages/Homepage";
import UserPage from "../pages/UserPage";
import Settings from "../pages/Settings";

import configRoutes from "../config/routes";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login"
import CommentForm from "../pages/CommentForm";

export const publicRoutes = [
    { path: configRoutes.home, component: Homepage },
    { path: `${configRoutes.profile}/:id`, component: UserPage },
    { path: configRoutes.settings, component: Settings },
    { path: configRoutes.register, component: Register },
    { path: configRoutes.login, component: Login },
    { path: configRoutes.commets, component: CommentForm}
    // Demo for other (possible) paths with different Layout
    // { path: '/search', component: Search, layout: SearchLayout }
];
