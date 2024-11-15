import React from 'react';
import Layout from '../../../components/layout/layout';
import Logotipo from '../../../assets/images/LOGO.svg';
import { Link } from 'react-router-dom';

const AbarrotesHome: React.FC = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="mb-6">
          <img src={Logotipo} alt="Logotipo" className="w-36 h-36" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <Link to="/registro-venta">
            <div className="w-full sm:w-64 p-6 bg-white border border-blue-500 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-blue-100">
              <h3 className="text-xl font-semibold text-blue-500 mb-2">Registrar Venta</h3>
              <p className="text-gray-600">Accede a la página de registro de ventas</p>
            </div>
          </Link>

          <div className="w-full sm:w-64 p-6 bg-white border border-yellow-500 rounded-lg shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-yellow-100 cursor-pointer">
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">Corte de Caja</h3>
            <p className="text-gray-600">Realiza el corte de caja y resumen del día</p>
          </div>

          <Link to="/historialventas">
            <div className="w-full sm:w-64 p-6 bg-white border border-purple-500 rounded-lg shadow-lg text-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-purple-100">
              <h3 className="text-xl font-semibold text-purple-500 mb-2">Detalle de Ventas</h3>
              <p className="text-gray-600">Consulta el historial detallado de ventas</p>
            </div>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AbarrotesHome;
