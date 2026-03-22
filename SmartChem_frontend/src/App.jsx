import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';

import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Practicals from './pages/Practicals';
import PracticalPreview from './pages/PracticalPreview';
import Quiz from './pages/Quiz';
import Equipments from './pages/Equipments';
import EquipmentPreview from './pages/EquipmentPreview';
import AboutUs from './pages/AboutUs';
import Safetymethods from './pages/Safetymethod';
import PracticalWorkplace from "./pages/PracticalWorkplace";
import Report from './pages/Report';

// Automatically scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes  */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />


          {/* App Routes  */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/practicals" element={<Practicals />} />
            <Route path="/practicals/:id" element={<PracticalPreview />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/equipments/:id" element={<EquipmentPreview />} />
            <Route path="/safetymethods" element={<Safetymethods />} />
            <Route path="/report" element={<Report />} />


          </Route>

          <Route path="/practicals/:id/workplace" element={<PracticalWorkplace />} />

        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;