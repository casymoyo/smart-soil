import './assets/scss/app.css'
import 'semantic-ui-css/semantic.min.css';
import '../src/assets/bootstrap/css/bootstrap.min.css'
import Navbar from './Navbar';
import Dashboard from './dasbhoard/Dashboard';
import Settings from './SystemSettings';
import 'react-toastify/dist/ReactToastify.css';
import Users from './users/Users';
import Login from './users/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return ( 
    <BrowserRouter>
      {isLoggedIn && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
