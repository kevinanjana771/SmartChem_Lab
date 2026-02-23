import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup'; 
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

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes  */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
          
          {/* App Routes  */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/practicals" element={<Practicals />} />
            <Route path="/practicals/:id" element={<PracticalPreview />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/equipments" element={<Equipments />} />
            <Route path="/equipments/:id" element={<EquipmentPreview />} />
            <Route path="/safetymethods" element={<Safetymethods />} />
            
          </Route>
          
          <Route path="/practicals/:id/workplace" element={<PracticalWorkplace />} />

        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;