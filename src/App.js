import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from "./hooks/useAuth";
import NavBar from "./pages/Layout/NavBar";
import Home from "./pages/Home";
import Footer from "./pages/Layout/Footer";
import Login from "./pages/Layout/Login/login";
import ProtectedRoute from "./pages/Layout/Login/protectedRoute";
import Users from "./pages/Users";
import Reports from "./pages/Report";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <NavBar />
                <Home />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <NavBar />
                <Users />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report-erros"
            element={
              <ProtectedRoute>
                <NavBar />
                <Reports />
                <Footer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;