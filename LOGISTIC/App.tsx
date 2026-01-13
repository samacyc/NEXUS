import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './HomePage';
import { AdminDashboard } from './components/admin/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;