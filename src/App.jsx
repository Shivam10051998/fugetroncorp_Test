import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Box from '@material-ui/core/Box';
import fallbackSpinner from './common/Spinner';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Box component="main" sx={{ p: 2, mb: '5px' }}>
                  <React.Suspense fallback={fallbackSpinner()}>
                    <route.element />
                  </React.Suspense>
                </Box>
              }
            />
          ))}
        </Routes>
      </Router>
     </Provider>
  );
}

export default App;
