import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Pacientes from './pages/Pacientes';
import Citas from './pages/Citas';
import FloatAccessibility from './components/FloatAccessibility';

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Ruta principal */}
            <Route path="/" element={<Dashboard />} />

            <Route path="/pacientes" element={<Pacientes />} />

            <Route path="/citas" element={<Citas />} />
          </Routes>
        </MainLayout>
      </Router>
      <FloatAccessibility />
    </AccessibilityProvider>
  );
}

export default App;