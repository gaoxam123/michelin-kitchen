import Homepage from "../pages/Homepage";
import UserPage from "../pages/UserPage";
import Settings from "../pages/Settings";

import configRoutes from "../config/routes";

export const publicRoutes = [
    { path: configRoutes.home, component: Homepage },
    { path: `${configRoutes.profile}/:id`, component: UserPage },
    { path: configRoutes.settings, component: Settings },
    // Demo for other (possible) paths with different Layout
    // { path: '/search', component: Search, layout: SearchLayout }
];
