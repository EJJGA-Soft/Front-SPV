import React from "react";

const Clients: React.FC = () => {
  // Lista de imágenes para empresas
  const clientLogos: string[] = [
    "google.png",
    "airbnb.png",
    "amazon.png",
    "shopify.png",
    "google.png",
  ];

  return (
    <div className="bg-gray-100 p-8 flex flex-col items-center justify-center gap-8 mt-20 xl:mt-0">
      {/* Título */}
      <h1 className="text-2xl font-medium text-gray-800 text-center">
        Trusted by greatest companies
      </h1>

      {/* Logotipos */}
      <div className="flex flex-col md:flex-row items-center flex-wrap gap-20">
        {clientLogos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt={`Logo of ${logo.split(".")[0]}`}
            className="w-40"
          />
        ))}
      </div>
    </div>
  );
};

export default Clients;
