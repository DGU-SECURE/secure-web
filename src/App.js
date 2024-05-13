import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Topbar from "./Components/Topbar";
import BrandSelect from "./Pages/BrandSelect";

function App() {
  return (
    <Router>
      <Topbar/>
        <Routes>
            <Route path="/brandselect" element={<BrandSelect />} />
        </Routes>
    </Router>
  );
}

export default App;
