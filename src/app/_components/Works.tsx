'use client'
import React, { useState } from "react";
import img2 from "@/assets/landing/pantallas/2.png";
import img3 from "@/assets/landing/pantallas/3.png";
import img1 from "@/assets/landing/pantallas/1.png";
import img4 from "@/assets/landing/pantallas/4.png";
import img5 from "@/assets/landing/pantallas/5.png";
import img6 from "@/assets/landing/pantallas/6.png";
import img7 from "@/assets/landing/pantallas/7.png";
import img8 from "@/assets/landing/pantallas/8.png";

const images = [
  {
    src: img1.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard de Ventas</h1>
        <p className="mt-4 text-lg text-gray-600">
          El <strong>Dashboard de Ventas</strong> proporciona una visión integral de las{" "}
          <strong>ventas del día</strong>, destacando el rendimiento de las{" "}
          <span className="font-semibold">bebidas</span> y los{" "}
          <span className="font-semibold">productos normales</span>. Se visualiza el total de
          ventas, el <span className="font-semibold">resumen de movimientos</span>, y las alertas
          de productos que están a punto de agotarse (
          <span className="text-red-500">menos de 10 unidades</span>).
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Además, se incluye un gráfico interactivo que muestra las{" "}
          <strong>ventas por hora</strong> y las categorías de productos más demandadas durante
          el día.
        </p>
      </div>
    ),
  },
  {
    src: img2.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Carrito de Registro de Venta</h1>
        <p className="mt-4 text-lg text-gray-600">
          El módulo de <strong>Carrito de Venta</strong> permite seleccionar productos de todo el
          inventario del sistema. Los productos se muestran organizados por categorías,
          facilitando su selección, y pueden añadirse al carrito con un solo clic.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Se ofrece la opción de <strong>filtrar por categoría</strong> y realizar modificaciones
          en el carrito, como agregar o eliminar productos. Al hacer clic en{" "}
          <span className="font-semibold">Cobrar</span>, se muestra un{" "}
          <span className="font-semibold">modal</span> que confirma la venta junto con el monto
          total y la forma de pago (efectivo o tarjeta).
        </p>
      </div>
    ),
  },
  {
    src: img3.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Historial de Ventas</h1>
        <p className="mt-4 text-lg text-gray-600">
          En el módulo de <strong>Detalle de Ventas</strong>, los usuarios pueden consultar el
          historial completo de ventas. Al hacer clic en el icono de <strong>ver</strong>, se
          abre un modal con detalles más específicos sobre cada transacción.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          También es posible exportar este historial a un archivo{" "}
          <span className="font-semibold">PDF</span>, facilitando la gestión y el análisis de
          las ventas realizadas.
        </p>
      </div>
    ),
  },
  {
    src: img4.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Módulo de Productos</h1>
        <p className="mt-4 text-lg text-gray-600">
          El <strong>Módulo de Productos</strong> permite a los usuarios gestionar el inventario
          de productos. Aquí se puede ver el <span className="font-semibold">stock</span>{" "}
          disponible, junto con la imagen, nombre, precio, categoría y proveedor de cada producto.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Además, se tiene la opción de <strong>agregar, editar y eliminar</strong> productos
          según sea necesario para mantener actualizado el inventario.
        </p>
      </div>
    ),
  },
  {
    src: img5.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Proveedores</h1>
        <p className="mt-4 text-lg text-gray-600">
          El módulo de <strong>Proveedores</strong> facilita la gestión de los contactos de los
          proveedores, mostrando su nombre, los productos que suministran y su información de
          contacto.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Los usuarios pueden <strong>agregar, editar o eliminar</strong> proveedores, asegurando
          que la base de datos se mantenga actualizada para un mejor control de las compras y
          relaciones comerciales.
        </p>
      </div>
    ),
  },
  {
    src: img6.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Editar Perfil</h1>
        <p className="mt-4 text-lg text-gray-600">
          El módulo de <strong>Edición de Perfil</strong> permite a los usuarios actualizar su
          nombre, correo electrónico y contraseña de manera segura.
        </p>
        <p className="mt-2 text-lg text-gray-600">
          Las contraseñas deben cumplir con los requisitos de seguridad establecidos: al menos 8
          caracteres, una mayúscula, un número y un carácter especial, garantizando la protección
          de la cuenta del usuario.
        </p>
      </div>
    ),
  },
  {
    src: img7.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Corte de Caja</h1>
        <p className="mt-4 text-lg text-gray-600">
          El <strong>modal de Corte de Caja</strong> permite generar reportes financieros
          detallados seleccionando fechas de inicio y fin. Al generar el corte, se ofrece un botón
          para descargar un <strong>PDF</strong> con el resumen completo de los movimientos de
          caja en ese intervalo de tiempo.
        </p>
      </div>
    ),
  },
  {
    src: img8.src,
    description: (
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Detalle de Venta</h1>
        <p className="mt-4 text-lg text-gray-600">
          El <strong>modal de Detalle de Venta</strong> proporciona información detallada sobre
          cada transacción. Se puede visualizar el monto total, los productos vendidos y la forma
          de pago utilizada, asegurando transparencia y control total sobre las ventas.
        </p>
      </div>
    ),
  },
];

const Works: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDescription, setSelectedDescription] = useState<JSX.Element | null>(null);

  const openModal = (image: string, description: JSX.Element) => {
    setSelectedImage(image);
    setSelectedDescription(description);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setSelectedDescription(null);
  };

  return (
    <section id="works" className="p-8 xl:p-20 bg-gray-100 ">
      <h2 className="text-3xl font-bold text-center mb-8">¿Cómo funciona el sistema?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {images.map((image, index) => (
          <div key={index} className="flex justify-center">
            <img
              src={image.src}
              alt={`Trabajo ${index + 1}`}
              className="w-full h-80 object-cover rounded-xl shadow-md cursor-pointer"
              onClick={() => openModal(image.src, image.description)}
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="overflow-y-auto bg-white p-6 rounded-lg max-w-3xl w-full h-[90vh] relative">
            <button
              className="absolute top-0 right-1 text-gray font-bold text-xl w-10 h-10"
              onClick={closeModal}
            >
              X
            </button>

            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              className="w-full mb-4 rounded-lg p-6"
            />

            {selectedDescription}
          </div>
        </div>
      )}
    </section>
  );
};

export default Works;
