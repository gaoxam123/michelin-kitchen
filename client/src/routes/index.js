import Homepage from "../pages/homepage/homepage";
import UserPage from "../pages/UserPage";

import configRoutes from "../config/routes";

export const publicRoutes = [
    { path: configRoutes.home, component: Homepage },
    { path: configRoutes.profile, component: UserPage },
    // Demo for other (possible) paths with different Layout
    // { path: '/search', component: Search, layout: SearchLayout }
];
