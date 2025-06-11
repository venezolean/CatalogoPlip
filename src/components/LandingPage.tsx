import React , { useRef } from 'react';
import video from './img/PRINCIPIO WEB.mp4';

interface LandingPageProps {
  onAccess: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAccess }) => {

const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    /* actualizamos CSS vars en el contenedor */
    containerRef.current!.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current!.style.setProperty('--mouse-y', `${y}px`);
  };


  return (
    <div       
    ref={containerRef}
    onMouseMove={handleMouseMove}
    className="min-h-screen flex items-center justify-center bg-cover bg-center"
    >
      {/* VIDEO DE FONDO */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Capa de degradado */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      
      
      {/* CONTENIDO SUPERIOR */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center p-8 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Catálogo de Productos
          </h1>
          <p className="text-white text-lg mb-1">
            Todo lo que buscas en un solo lugar 
          </p>
          <p className="text-white text-lg mb-8">
            A un plip de distancia
          </p>
          <button
            onClick={onAccess}
            className="px-8 py-4 bg-[#ff6600] text-white font-semibold rounded-lg text-lg transition-colors hover:bg-[#fc340a] focus:outline-none focus:ring-2 focus:ring-[#fc340a] focus:ring-opacity-50 btn-blink"
          >
            Acceder
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;