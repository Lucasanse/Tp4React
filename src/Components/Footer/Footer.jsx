import { useTranslation } from "react-i18next";

export const Footer = () => {
  const integrantes = [
    { nombre: "Lian Ivan Sinchez", link: "https://github.com/LianIvanSinchez09" },
    { nombre: "Lucas San Segundo", link: "https://github.com/Lucasanse" },
    { nombre: "Joaquin Ignacio Castillo", link: "https://github.com/NaxoCastt" }
  ];
  const { t } = useTranslation();
  return (
    <footer className="h-min from-pink-200 via-purple-200 to-blue-200 text-gray-900 py-8 border-t-4 border-dashed border-white">
      <div className="container mx-auto px-6 justify-center items-center">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          {t("footer.integers")}
        </h2>
        <div className="flex flex-col gap-3 w-full items-center">
          {integrantes.map((e) => (
            <a
              key={e.nombre}
              href={e.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg w-xl px-4 py-2 rounded-lg bg-white border-l-4 border-purple-400 shadow hover:scale-105 hover:border-pink-400 transition-transform duration-200"
            >
              {e.nombre}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
