import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Printer } from 'lucide-react';
import { Product, ProductCategory, CATEGORY_NAMES } from '../types';
import { fetchProducts } from '../services/api';
import BudgetProductCard from './BudgetProductCard';
import { formatCurrency } from '../utils/format';
import logo from './img/Plip.png';

interface BudgetProduct extends Product {
  quantity: number;
  unitPrice: number;
}

interface BudgetInfo {
  clientName: string;
  attendedBy: string;
  date: string;
  products: BudgetProduct[];
  ivaType: 'none' | '21' | '10.5';
  phone: string;
}

const BudgetPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [budget, setBudget] = useState<BudgetInfo>({
    clientName: '',
    attendedBy: '',
    date: new Date().toISOString().split('T')[0],
    products: [],
    ivaType: 'none',
    phone: ''
  });

  const printRef = useRef<HTMLDivElement>(null);
  
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleProductSelect = (product: Product, quantity: number, unitPrice: number) => {
    setBudget(prev => {
      const updatedProducts = [...prev.products];
      const existingIndex = updatedProducts.findIndex(p => p.id === product.id);

      if (existingIndex >= 0) {
        if (quantity === 0) {
          updatedProducts.splice(existingIndex, 1);
        } else {
          updatedProducts[existingIndex] = { ...updatedProducts[existingIndex], quantity, unitPrice };
        }
      } else if (quantity > 0) {
        updatedProducts.push({ ...product, quantity, unitPrice });
      }

      return {
        ...prev,
        products: updatedProducts,
      };
    });
  };

  const calculateSubtotal = () => {
    return budget.products.reduce((acc, product) => {
      return acc + (product.quantity * product.unitPrice);
    }, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    switch (budget.ivaType) {
      case '21':
        return subtotal * 1.21;
      case '10.5':
        return subtotal * 1.105;
      default:
        return subtotal;
    }
  };

  const groupedProducts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<ProductCategory, Product[]>);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <header className="bg-white shadow-md p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Generar Presupuesto</h1>
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          >
            <Printer className="w-5 h-5" />
            Exportar PDF
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div ref={printRef} className="bg-white p-6">
          {/* Cabecera */}
          <header className="grid grid-cols-3 items-start border-b pb-2">
            <div>
              <img src={logo} alt="Logo PlipShop" className="h-10 w-auto object-contain" />
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold">PRESUPUESTO</h2>
            </div>
            <div className="text-right text-xs">
              <p>Nº <strong>{String(Math.floor(Math.random() * 10000)).padStart(4, '0')}</strong></p>
              <p>Fecha: <strong>{budget.date}</strong></p>
            </div>
            <div className="col-span-3 mt-2 text-xs text-gray-700">
              <p><strong>Dirección:</strong> Av. Jujuy 50, C.A.B.A.</p>
              <p><strong>Teléfono:</strong> 1127240042</p>
              <p><strong>Correo:</strong> ventas.plipshop@gmail.com</p>
              <p><strong>Web:</strong> www.plipshop.com.ar</p>
            </div>
          </header>

          {/* Cliente */}
          <section className="grid grid-cols-2 gap-4 mt-3 p-2 border rounded text-xs">
            <div>
              <p><strong>Cliente:</strong> {budget.clientName || '—'}</p>
              <p><strong>Atendido por:</strong> {budget.attendedBy || '—'}</p>
              <p><strong>Teléfono:</strong> {budget.phone || '—'}</p>
            </div>
            <div className="text-right">
              <p><strong>Condición de IVA:</strong> {
                budget.ivaType === 'none' ? 'Sin IVA' :
                budget.ivaType === '21' ? 'IVA 21%' : 'IVA 10.5%'
              }</p>
            </div>
          </section>

          {/* Tabla productos */}
          <table className="w-full mt-3 border-collapse text-xs">
            <thead className="bg-gray-100 text-xs">
              <tr>
                <th className="px-1 py-1 text-left">Item</th>
                <th className="px-1 py-1 text-left">Código</th>
                <th className="px-1 py-1 text-left">Artículo</th>
                <th className="px-1 py-1 text-right">Cant.</th>
                <th className="px-1 py-1 text-right">Precio</th>
                <th className="px-1 py-1 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="text-xs leading-tight">
              {budget.products.map((p, i) => (
                <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-1 py-1">{String(i + 1).padStart(4, '0')}</td>
                  <td className="px-1 py-1">{p.id.toString().padStart(5, '0')}</td>
                  <td className="px-1 py-1">{p.name}</td>
                  <td className="px-1 py-1 text-right">{p.quantity}</td>
                  <td className="px-1 py-1 text-right">{formatCurrency(p.unitPrice)}</td>
                  <td className="px-1 py-1 text-right">{formatCurrency(p.quantity * p.unitPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totales */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <div className="col-span-2" />
            <div className="p-2 border rounded bg-gray-50 space-y-1">
              <p>Subtotal: <strong>{formatCurrency(calculateSubtotal())}</strong></p>
              <p>IVA 10.5%: <strong>{budget.ivaType === '10.5' ? formatCurrency(calculateSubtotal() * 0.105) : formatCurrency(0)}</strong></p>
              <p>IVA 21%: <strong>{budget.ivaType === '21' ? formatCurrency(calculateSubtotal() * 0.21) : formatCurrency(0)}</strong></p>
              <p className="text-sm mt-1">TOTAL: <strong className="text-blue-600">{formatCurrency(calculateTotal())}</strong></p>
            </div>
          </div>

          {/* Notas */}
          <footer className="mt-4 border-t pt-2 text-xs text-gray-600">
            <ul className="list-disc list-inside space-y-1">
              <li>🟢 Todos los productos son de alta calidad garantizada.</li>
              <li>💡 Los precios son {budget.ivaType === 'none' ? 'netos, sin IVA' : 'con IVA incluido'}.</li>
              <li>🎁 Descuentos disponibles por compras mayores o clientes frecuentes.</li>
            </ul>
          </footer>
        </div>

        {/* Formulario de datos */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre del Cliente</label>
              <input
                type="text"
                value={budget.clientName}
                onChange={(e) => setBudget(prev => ({ ...prev, clientName: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Atendido por</label>
              <input
                type="text"
                value={budget.attendedBy}
                onChange={(e) => setBudget(prev => ({ ...prev, attendedBy: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fecha</label>
              <input
                type="date"
                value={budget.date}
                onChange={(e) => setBudget(prev => ({ ...prev, date: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Teléfono del Cliente</label>
              <input
                type="text"
                value={budget.phone}
                onChange={(e) => setBudget(prev => ({ ...prev, phone: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Selector de productos */}
        <div className="space-y-8">
          {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
            <section key={category} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">{CATEGORY_NAMES[category as ProductCategory]}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryProducts.map(product => (
                  <BudgetProductCard
                    key={product.id}
                    product={product}
                    onUpdate={handleProductSelect}
                    selected={budget.products.find(p => p.id === product.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setBudget(prev => ({ ...prev, ivaType: 'none' }))}
                  className={`px-4 py-2 rounded ${budget.ivaType === 'none' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  Sin IVA
                </button>
                <button
                  onClick={() => setBudget(prev => ({ ...prev, ivaType: '21' }))}
                  className={`px-4 py-2 rounded ${budget.ivaType === '21' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  IVA 21%
                </button>
                <button
                  onClick={() => setBudget(prev => ({ ...prev, ivaType: '10.5' }))}
                  className={`px-4 py-2 rounded ${budget.ivaType === '10.5' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                >
                  IVA 10.5%
                </button>
              </div>
              
              <div className="text-right">
                <p className="text-sm">
                  Subtotal: <span className="font-semibold">{formatCurrency(calculateSubtotal())}</span>
                </p>
                <p className="text-2xl font-bold">
                  Total: <span className="text-blue-600">{formatCurrency(calculateTotal())}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BudgetPage;