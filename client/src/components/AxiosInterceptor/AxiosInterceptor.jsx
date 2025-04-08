import { useEffect } from "react";
import request from "../../utils/request";
import { useNavigate } from "react-router-dom";
import routes from "../../config/routes";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = request.interceptors.response.use(
      (response) => response,
      (error) => {
        const method = error.config?.method?.toUpperCase();
        if (error.response?.status === 403 && method !== "GET") {
          navigate(routes.login);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      request.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return children;
};

export default AxiosInterceptor;
