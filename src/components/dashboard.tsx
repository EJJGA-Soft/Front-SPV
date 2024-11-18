import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import IBebidas from '../assets/icons/IAccess.svg';
import IProductos from '../assets/icons/IProductos.svg';
import IAccess from '../assets/icons/IAccess.svg';
import ICancel from '../assets/icons/ICancel.svg';
import ITotal from '../assets/icons/ITotal.svg';
import IVentas from '../assets/icons/IVentas.svg';
import ICategoria from '../assets/icons/ICategoria.svg';
import IStock from '../assets/icons/IStock.svg';
import Layout from './layout/layout';



ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard: React.FC = () => {
  const data = {
    labels: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
    datasets: [
      {
        label: 'Bebidas',
        data: [30000, 45000, 20000, 55000, 40000, 30000, 45000, 50000, 35000, 30000],
        backgroundColor: '#27A9E0',
      },
      {
        label: 'Productos',
        data: [20000, 35000, 15000, 45000, 35000, 20000, 40000, 45000, 30000, 25000],
        backgroundColor: '#AB60F1',
      },
      {
        label: 'Total',
        data: [50000, 80000, 45000, 100000, 75000, 50000, 85000, 95000, 65000, 55000],
        backgroundColor: '#33CC66',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'category' as const,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <> 
    <Layout>
    <div className="grid grid-cols-1 md:grid-cols-5 md:mt-[-80px] mb-[-10px] gap-4 sm:py-10 px-6 pt-5 pb-[140px]">
      {/* Columna Izquierda (60% de ancho) */}
      <div className="md:col-span-3 space-y-4">
        {/* Resumen de ventas */}
        <div className="bg-white rounded-lg p-4 shadow-md">
     <h2 className="text-lg font-semibold mb-2">Resumen de ventas</h2>
      <div className="flex justify-around items-center">
    <div className="flex flex-col items-center">
    <img src={IBebidas} alt="Bebidas" className="h-8 mb-1" />
    <p className="text-xl font-bold">$850</p>
      <p className="text-gray-600">Bebidas</p>
     </div>
    
    {/* Línea vertical entre Bebidas y Productos */}
    <div className="border-l border-gray-300 h-12 mx-4"></div>
    
    <div className="flex flex-col items-center">
      <img src={IProductos} alt="Productos" className="h-8 mb-1" />
      <p className="text-xl font-bold">$2000</p>
      <p className="text-gray-600">Productos</p>
    </div>
    
    {/* Línea vertical entre Productos y Total */}
    <div className="border-l border-gray-300 h-12 mx-4"></div>
    
    <div className="flex flex-col items-center">
      <img src={ITotal} alt="Total" className="h-8 mb-1" />
      <p className="text-xl font-bold">$17,500</p>
      <p className="text-gray-600">Total</p>
    </div>
  </div>
  </div>


        {/* Resumen de movimientos */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Resumen de movimientos</h2>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <img src={ICancel} alt="Cancelaciones" className="h-8 mb-1" />
              <p className="text-xl font-bold">5</p>
              <p className="text-gray-600">Cancelaciones</p>
            </div>
            <div className="border-l border-gray-300 h-12 mx-4"></div>

            <div className="flex flex-col items-center">
              <img src={IAccess} alt="Accesos" className="h-8 mb-1" />
              <p className="text-xl font-bold">15</p>
              <p className="text-gray-600">Accesos</p>
            </div>
            <div className="border-l border-gray-300 h-12 mx-4"></div>

            <div className="flex flex-col items-center">
              <img src={IVentas} alt="Ventas" className="h-8 mb-1" />
              <p className="text-xl font-bold">40</p>
              <p className="text-gray-600">Ventas</p>
            </div>
          </div>
        </div>

        {/* Ventas del día */}
        <div className="bg-white rounded-lg p-4 shadow-md h-80">
          <h2 className="text-lg font-semibold mb-2">Ventas del día</h2>
          <div className="p-4 h-64">
          <Bar data={data} options={options} />
          </div>
        </div>
      </div>

      {/* Columna Derecha (40% de ancho) */}
      <div className="md:col-span-2 space-y-4">
        {/* Resumen de inventario */}
        <div className="bg-white rounded-lg p-4 shadow-md h-1/2 flex flex-col items-center justify-center">
        <h2 className="text-lg font-semibold mb-2">Resumen de inventario</h2>
        <img src={IStock} alt="Stock" className="h-8 mb-1" />
        <p className="text-gray-600">Stock disponible</p>
        
        {/* Línea horizontal */}
        <hr className="w-full border-t border-gray-300 my-4" />
      
        <img src={ICategoria} alt="Categorías" className="h-8 mt-4" />
        <p className="text-gray-600">Productos categorías</p>
      </div>
      

        <div className="bg-white rounded-lg p-4 shadow-md h-[315px] flex flex-col">
          <h2 className="text-lg font-semibold mb-2">Productos por agotarse</h2>
                <ul>
        {[
          { name: 'Tata salt', cantidad: 3 },
          { name: 'Sabritas', cantidad: 3 },
          { name: 'Galletas chokis', cantidad: 1 },
          { name: 'Coca cola 2.5L', cantidad: 1 },
        ].map((item, index) => (
          <li key={index} className="flex justify-between items-center my-2">
            <div className="flex items-center">
              <img 
              src={`src/assets/productsDashboard/${item.name.toLowerCase().replace(/\s/g, '-')}-icono.svg`} 
              alt={item.name} 
                className="h-8 mr-2" 
              />
              <span>{item.name}</span>
            </div>
            <span className="text-red-500">Cantidad restante: {item.cantidad}</span>
          </li>
        ))}
      </ul>

        </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default Dashboard;