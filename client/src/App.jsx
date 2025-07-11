import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { publicRoutes } from "./routes";
import { useCallback, useEffect } from "react";
import { auth } from "./store/user";
import { useDispatch } from "react-redux";
import AxiosInterceptor from "./components/AxiosInterceptor";

function App() {
  const dispatch = useDispatch();
  const authUser = useCallback(async () => {
    await dispatch(auth());
  }, [dispatch]);
  useEffect(() => {
    authUser();
  }, [authUser]);
  return (
    <BrowserRouter>
      <AxiosInterceptor>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Component = route.component;
              const ComponentLayout = route.layout || Layout;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <ComponentLayout>
                      <Component />
                    </ComponentLayout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </AxiosInterceptor>
    </BrowserRouter>
  );
}

export default App;
