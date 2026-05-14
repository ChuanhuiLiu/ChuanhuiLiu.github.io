import { Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';
import NaturePage from '@/pages/NaturePage';
import StillLifePage from '@/pages/StillLifePage';
import MaterialsPage from '@/pages/MaterialsPage';
import MetalPartsPage from '@/pages/MetalPartsPage';

function AppContent() {
  useLenis();

  return (
    <>
      <Navigation />
      <CartSidebar />
      <main>
        <Routes>
          <Route path="/" element={<NaturePage />} />
          <Route path="/still-life" element={<StillLifePage />} />
          <Route path="/materials" element={<MaterialsPage />} />
          <Route path="/metal-parts" element={<MetalPartsPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
