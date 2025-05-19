import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Catalog from './components/Catalog';
import BudgetPage from './components/BudgetPage';
import CartButton from './components/CartButton';
import { CartProvider } from './context/CartContext';

function App() {
  const [showCatalog, setShowCatalog] = useState<boolean>(false);
  const [showBudget, setShowBudget] = useState<boolean>(false);

  const handleAccess = () => {
    setShowCatalog(true);
  };

  return (
    <CartProvider>
      <div className="min-h-screen">
        {!showCatalog && !showBudget ? (
          <LandingPage onAccess={handleAccess} />
        ) : showBudget ? (
          <BudgetPage />
        ) : (
          <>
            <Catalog />
            <div className="fixed bottom-6 left-6">
              <button
                onClick={() => setShowBudget(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300"
              >
                Generar Presupuesto
              </button>
            </div>
            <CartButton />
          </>
        )}
      </div>
    </CartProvider>
  );
}

export default App;