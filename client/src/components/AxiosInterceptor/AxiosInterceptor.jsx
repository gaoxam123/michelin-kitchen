import { useEffect } from "react";
import request from "../../utils/request";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../config/routes";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interceptor = request.interceptors.response.use(
      (response) => response,
      (error) => {
        const method = error.config?.method?.toUpperCase();
        if (error.response?.status === 403 && method !== "GET") {
          navigate(routes.login, {
            state: { from: location.pathname },
          });
        }
        return Promise.reject(error);
      }
    );

    return () => {
      request.interceptors.response.eject(interceptor);
    };
  }, [navigate, location]);

  return children;
};

export default AxiosInterceptor;
