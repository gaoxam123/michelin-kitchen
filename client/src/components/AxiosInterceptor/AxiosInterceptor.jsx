import { useEffect } from "react";
import request from "../../utils/request";
import { useNavigate } from "react-router-dom";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = request.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 403) {
          navigate("/login");
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
