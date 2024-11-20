export default function Page404() {
    return (
      <section className="flex items-center justify-center h-screen w-screen bg-white">
        <div className="text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold text-gray-900 lg:text-9xl">404</h1>
          <p className="mb-4 text-3xl font-bold text-gray-900">Algo falta aquí.</p>
          <p className="mb-4 text-lg text-gray-500">
            Lo sentimos, no podemos encontrar esta página. Puedes explorar más en la página de inicio.
          </p>
          <a
            href="/"
            className="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-900"
          >
            Volver al inicio
          </a>
        </div>
      </section>
    );
  }
  