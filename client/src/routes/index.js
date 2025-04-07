import Homepage from "../pages/Homepage";
import UserPage from "../pages/UserPage";
import Settings from "../pages/Settings";

import configRoutes from "../config/routes";
import Register from "../pages/Authentication/Register";
import Login from "../pages/Authentication/Login";
import BlogWithComment from "../pages/BlogWithComment/BlogWithComment";

// Testing zone
// TODO: Remove
import CommentSection from "../components/CommentSection/CommentSection";
import UserForm from "../components/UserForm";

export const publicRoutes = [
  { path: configRoutes.home, component: Homepage },
  { path: `${configRoutes.profile}/:id`, component: UserPage },
  { path: configRoutes.settings, component: Settings },
  { path: configRoutes.register, component: Register },
  { path: configRoutes.login, component: Login },
  { path: `${configRoutes.blog}/:id`, component: BlogWithComment },
  // Demo for other (possible) paths with different Layout
  // { path: '/search', component: Search, layout: SearchLayout }

  // Testing zone
  // TODO: Remove
  { path: "/test", component: UserForm },
];
