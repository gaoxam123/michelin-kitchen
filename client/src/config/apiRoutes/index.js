const apiRoutes = {
  auth: {
    register: "/auth/register",
    authenticate: "/auth/authenticate",
    logout: "/auth/logout"
  },
  users: {
    base: "/users",
    search: "/users/search",
  },
  blogs: {
    base: "/blogs"
  },
  follows: "/follows",
};

export default apiRoutes;
