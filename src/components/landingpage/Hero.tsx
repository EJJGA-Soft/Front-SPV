import React from "react";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import logotipo from "../../assets/images/LOGO.svg";
import icon1 from "../../assets/landing/1.png";
import icon2 from "../../assets/landing/2.png";
import icon3 from "../../assets/landing/3.png";

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-[90vh] grid grid-cols-1 xl:grid-cols-8">
      <div className="md:col-span-5 flex items-center justify-center p-8 xl:p-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl xl:text-7xl font-bold xl:leading-[7.5rem]">
            Sistema de Abarrotes{" "}
            <span className="text-primary py-2 px-6 border-8 border-primary relative inline-block">
              Post-Ventas
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -top-5 p-2 bg-primary rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -top-5 p-2 bg-primary rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -right-5 -bottom-5 p-2 bg-primary rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-white text-base absolute -left-5 -bottom-5 p-2 bg-primary rounded-full box-content" />
            </span>
          </h1>
          <p className="text-gray-500 text-2xl leading-[2.5rem]">
            Mejora la gestión de inventarios y ventas en tu tienda de abarrotes
            con un sistema fácil de usar. Proporcionamos soluciones eficientes
            para el manejo post-venta y atención al cliente.
          </p>
        </div>
      </div>
      <div className="md:col-span-3 flex items-center justify-center relative">
        <div>
          <img
            src={logotipo}
            alt="Hero"
            className="w-[250px] h-[250px] md:w-[380px] md:h-[380px] object-cover xl:-mt-28"
          />
          <div className="relative bg-white shadow-xl rounded-lg p-4 flex flex-col justify-center gap-2 max-w-[250px] mx-auto -mt-12">
            <h2 className="text-xl font-bold tracking-[1px] text-gray-800">
              Fácil, Rápido y Seguro
            </h2>

            <div className="absolute -right-12 -bottom-12 -z-10">
              <div className="relative">
                <RiCheckboxBlankCircleFill className="text-primary text-8xl" />
                <div className="absolute left-0 top-0 bg-white w-14 h-14"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[280px] h-[280px] md:w-[380px] md:h-[380px] bg-white border-[10px] border-primary rounded-full -z-10"></div>

        {[
          { src: icon1, position: "top-[12%] right-[20%] xl:right-[10%]" },
          {
            src: icon2,
            position: "top-[10%] xl:top-[2%] left-[20%] xl:left-[10%]",
          },
          {
            src: icon3,
            position: "bottom-[5%] left-[15%] xl:left-[3%] -rotate-12",
          },
        ].map((logo, index) => (
          <img
            key={index}
            src={logo.src}
            alt={`Icon ${index + 1}`}
            className={`w-10 h-10 md:w-20 md:h-20 object-cover rounded-full border-l-8 border-gray-600 absolute ${logo.position} transition-transform transform hover:scale-110 hover:rotate-12`} // Aquí se aplica el efecto hover
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
