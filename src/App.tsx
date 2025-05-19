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
            <CartButton />
          </>
        )}
      </div>
    </CartProvider>
  );
}

export default App;