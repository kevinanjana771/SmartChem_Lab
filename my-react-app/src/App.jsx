import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/Dashboard';
import Practicals from './pages/Practicals';
import PracticalPreview from './pages/PracticalPreview';
import Quiz from './pages/Quiz';
import Equipments from './pages/Equipments';
import EquipmentPreview from './pages/EquipmentPreview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/practicals" element={<Practicals />} />
          <Route path="/practicals/:id" element={<PracticalPreview />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/equipments" element={<Equipments />} />
          <Route path="/equipments/:id" element={<EquipmentPreview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;