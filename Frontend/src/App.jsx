// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routeConfig from './routes/routeConfig';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routeConfig.map((item, index) => (
          <Route key={index} path={item.path} element={item.element} >
            {
              item.children && item.children.map((child, childIndex) => (
                <Route key={childIndex} path={child.path} element={child.element} />
                ))
            }
          </Route>
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
