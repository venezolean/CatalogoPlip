import React from 'react';

interface LandingPageProps {
  onAccess: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccess }) => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1920')` 
      }}
    >
      <div className="text-center p-8 max-w-lg">
        <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
          Catálogo de Productos
        </h1>
        <p className="text-white text-lg mb-8">
          Descubre nuestra amplia selección de productos para empaque y embalaje.
        </p>
        <button
          onClick={onAccess}
          className="px-8 py-4 bg-[#ff6600] text-white font-semibold rounded-lg text-lg transition-colors hover:bg-[#fc340a] focus:outline-none focus:ring-2 focus:ring-[#fc340a] focus:ring-opacity-50"
        >
          Acceder
        </button>
      </div>
    </div>
  );
};

export default LandingPage;