import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import IBebidas from "../assets/icons/IAccess.svg";
import IProductos from "../assets/icons/IProductos.svg";
import IAccess from "../assets/icons/IAccess.svg";
import ICancel from "../assets/icons/ICancel.svg";
import ITotal from "../assets/icons/ITotal.svg";
import IVentas from "../assets/icons/IVentas.svg";
import IconCategory from "../assets/icons/ICategoria.svg";
import IStock from "../assets/icons/IStock.svg";
import Layout from "./layout/layout";
import BaseService from "../modules/services/base_service";
import { Producto } from "../interfaces/Inventario/producto_interface";
import { Api_Connection } from "../modules/services/API/api_connection";
import LoadingTables from "./loading/loadingtables";
import { IAccount } from "../interfaces/newAccount._interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const baseService = new BaseService();
const api_connection = Api_Connection();

const Dashboard: React.FC = () => {
  const [loadingProductsRunOut, setLoadingRunOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const fetchChartData = async () => {
    try {
      const result = await baseService.GetSimple("/Venta/SummarySalesByDay");
      if (result.success) {
        const categories = result.data as { nombreCategoria: string; total: number }[];
  
        const colors = categories.map(() => getRandomColor());
  
        setChartData({
          labels: ["Categorías"], // Etiqueta genérica única
          datasets: categories.map((item, index) => ({
            label: item.nombreCategoria, // Nombre específico de cada categoría
            data: [item.total], // Solo un valor por categoría
            backgroundColor: colors[index],
            borderColor: colors[index],
            borderWidth: 1,
          })),
        });
      }
    } catch (error) {
      console.error("Error al obtener datos para la gráfica:", error);
    }
  };
  
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category" as const,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };
  
  
  
  
   

  const [productsRunOut, setProductsRunOut] = useState<Producto[]>([]);
  const [message, setMessage] = useState<string>("");
  const ProductsRunOut = async () => {
    setLoadingRunOut(true);
    const results = await baseService.Get<Producto>(
      "/Productos/ProductsByRunOut"
    );

    const response = results.data as Producto[];
    const url = api_connection.split("/api");
    const headurl = url.join("");

    response.forEach((element) => {
      element.urlImagen = `${headurl}${element.urlImagen}`;
    });

    if (results.success) {
      setLoadingRunOut(false);
      if (response.length > 0) {
        setProductsRunOut(response);
      } else {
        setMessage("No hay productos por agotarse");
      }
    } else {
      setError(results.message!);
    }
  };

  const [countSales, setCountSales] = useState<number>(0);

  const APIVentaCount = async () => {
    const results = await baseService.GetSimple("/Venta/GetSalesInDayCount");

    if (results.success) {
      const data = results.data as number;
      setCountSales(data);
    }
  };

  const [countAccess, setCountAccess] = useState<number>(0);
  const APIUsersCount = async () => {
    const results = await baseService.Get<IAccount>("/Account/GetUsers");

    if (results.success) {
      const cast = results.data as IAccount[];
      const count = cast.length;
      setCountAccess(count);
    }
  };

  const [countTotalProduct, setCountTotalProduct] = useState<number>(0);
  const APITotalProducts = async () => {
    const results = await baseService.GetSimple(
      "/VentaProducto/GetTotalProducts"
    );

    if (results.success) {
      setCountTotalProduct(results.data as number);
    }
  };

  interface Sumarry {
    nombreCategoria: string;
    total: number;
  }

  const [dbCategories, setCategories] = useState<Sumarry[]>([]);

  const APICategories = async () => {
    const results = await baseService.GetSimple<Sumarry[]>("/Venta/SummarySalesByDay");

    if (results.success) {
      const response = results.data as Sumarry[];
      setCategories(response);
    }
  };

  useEffect(() => {
    ProductsRunOut();
    APIVentaCount();
    APIUsersCount();
    APITotalProducts();
    APICategories();
    fetchChartData();
  }, []);

  return (
    <>
      <Layout>
        <div className="grid grid-cols-1 md:grid-cols-5 md:mt-[-80px] mb-[-10px] gap-4 sm:py-10 px-6 pt-5 pb-[140px]">
          {/* Columna Izquierda (60% de ancho) */}
          <div className="md:col-span-3 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                Resumen de ventas del día
              </h2>
              <div className="flex justify-center">
                {dbCategories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center px-10">
                      <img
                        src={IProductos}
                        alt={category.nombreCategoria}
                        className="h-8 mb-1"
                      />
                      <p className="text-xl font-bold">${category.total}</p>
                      <p className="text-gray-600">
                        {category.nombreCategoria}
                      </p>
                    </div>

                    {index < dbCategories.length - 1 && (
                      <div className="border-l border-gray-300 h-12 mx-4"></div>
                    )}
                  </div>
                  
                ))}

                <div className="border-l border-gray-300 mt-[15px] h-12 mx-4"></div>

                <div className="flex flex-col items-center px-[40px]">
                  <img src={ITotal} alt="Total" className="h-8 mb-1" />
                  <p className="text-xl font-bold">${countTotalProduct}</p>
                  <p className="text-gray-600">Total</p>
                </div>
              </div>
            </div>

            {/* Resumen de movimientos */}
            <div className="bg-white rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold mb-2">
                Resumen de movimientos
              </h2>
              <div className="flex justify-around px-[90px]">
                <div className="flex flex-col items-center">
                  <img src={IAccess} alt="Accesos" className="h-8 mb-1" />
                  <p className="text-xl font-bold">{countAccess}</p>
                  <p className="text-gray-600">Accesos</p>
                </div>
                <div className="border-l border-gray-300 h-12 mx-4"></div>

                <div className="flex flex-col items-center">
                  <img src={IVentas} alt="Ventas" className="h-8 mb-1" />
                  <p className="text-xl font-bold">{countSales}</p>
                  <p className="text-gray-600">Ventas</p>
                </div>
              </div>
            </div>

            {/* Ventas del día */}
            <div className="bg-white rounded-lg p-4 shadow-md h-80">
              <h2 className="text-lg font-semibold mb-2">Ventas del día</h2>
              <div className="p-4 h-64">
                <Bar data={chartData} options={options} />
              </div>
            </div>
          </div>

          {/* Columna Derecha (40% de ancho) */}
          <div className="md:col-span-2 space-y-4">
            {/* Resumen de inventario */}
            <div className="bg-white rounded-lg p-4 shadow-md h-[328px] flex flex-col items-center justify-center">
              <h2 className="text-lg font-semibold mb-3">
                Resumen de inventario
              </h2>
              <a
                href="/inventario"
                className="flex flex-col items-center text-center"
              >
                <img src={IStock} alt="Stock" className="h-8 mb-1" />
                <p className="text-gray-600">Stock disponible</p>
              </a>

              {/* Línea horizontal */}
              <hr className="w-full border-t border-gray-300 my-4" />

              <a
                href="/proveedores"
                className="flex flex-col items-cemter text-center"
              >
                <img
                  src={IconCategory}
                  alt="Categorías"
                  className="h-8 mt-4 mb-2"
                />
                <p className="text-gray-600">Proveedores con Productos</p>
              </a>
            </div>

            {/* Productos por agotarse */}
            {loadingProductsRunOut ? (
              <LoadingTables />
            ) : (
              <div className="bg-white rounded-lg p-4 shadow-md h-[320px] flex flex-col">
                <h2 className="text-lg font-semibold mb-2">
                  Productos por agotarse
                </h2>

                {productsRunOut.length <= 0 ? (
                  <div className="flex flex-1 items-center justify-center mt-[-30px]">
                    <ul className="text-center">
                      {error ? <li>{error}</li> : <li>{message}</li>}
                    </ul>
                  </div>
                ) : (
                  <ul>
                    {productsRunOut.map((product) => (
                      <li
                        key={product.id}
                        className="flex justify-between items-center my-2"
                      >
                        <div className="flex items-center">
                          <img
                            src={product.urlImagen}
                            alt={product.nombre}
                            className="h-8 mr-2"
                          />
                          <span className="ml-4">{product.nombre}</span>
                        </div>
                        <span className="text-red-500">
                          Cantidad restante: {product.stock}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
