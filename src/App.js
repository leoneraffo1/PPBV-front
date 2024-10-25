import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NavBar from "./pages/Layout/NavBar";
import Home from "./pages/Home";
import Footer from "./pages/Layout/Footer";
function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/usuarios" element={<Usuarios />} /> */}
        {/* <Route path="/reportar-erros" element={<ReportarErros />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
