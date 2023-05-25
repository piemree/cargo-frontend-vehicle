import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './scss/style.scss';
import Login from './views/pages/login/Login';
import Page404 from './views/pages/page404/Page404';
import { privateRoutes } from './routes';
import DefaultLayout from './layout/DefaultLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { ProvideGlobals } from './hooks/useGlobals';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <ProvideGlobals>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            name="Login Page"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {privateRoutes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={
                    <ProtectedRoute>
                      <DefaultLayout>
                        <route.element />
                      </DefaultLayout>
                    </ProtectedRoute>
                  }
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" replace />} />

          <Route path="*" name="Page 404" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </ProvideGlobals>
  );
}

export default App;
