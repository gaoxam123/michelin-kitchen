const apiRoutes = {
  auth: {
    register: "/auth/register",
    authenticate: "/auth/authenticate",
    logout: "/auth/logout",
  },
  users: {
    base: "/users",
    search: "/users/search",
    auth: "/users/auth-me",
  },
  blogs: {
    base: "/blogs",
  },
  follows: "/follows",
};

export default apiRoutes;
