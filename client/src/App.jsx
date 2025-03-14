import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { publicRoutes } from './routes'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map(
            (route, index) => {
              const Component = route.component
              const ComponentLayout = route.layout || Layout
              return <Route
                key={index}
                path={route.path}
                element={
                  <ComponentLayout>
                    <Component />
                  </ComponentLayout>
                } />
            }
          )}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App