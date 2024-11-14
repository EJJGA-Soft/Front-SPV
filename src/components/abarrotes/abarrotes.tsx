import React from 'react';
import Layout from '../layout/layout';
import Logotipo from '../../assets/images/LOGO.svg'
import { Link } from 'react-router-dom';
const CardComponent: React.FC = () => {
  return (
    <>
    <Layout>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="mb-4">
        <img src={Logotipo} alt="Logotipo" className="w-32 h-32" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="flex justify-center">
        <Link to="/registro-venta">
        <div className="w-64 p-6 border-4 border-blue-500 rounded-lg shadow-lg text-center cursor-pointer hover:bg-blue-50">
          <h3 className="text-xl font-semibold text-blue-500 mb-4">Registrar Venta</h3>
        </div>
      </Link>
        </div>

        <div className="flex justify-center">
          <div className="w-64 p-6 border-4 border-yellow-500 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-yellow-500 mb-4">Corte de Caja</h3>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-64 p-6 border-4 border-purple-500 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-purple-500 mb-4">Detalle de Ventas</h3>
          </div>
        </div>
      </div>
    </div>
    </Layout>
    </>
  );
};

export default CardComponent;
