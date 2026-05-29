import { useTranslation } from "react-i18next";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import ErrorComponent from "../../Components/Error/ErrorComponent";


export default function NotFound() {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <img src="./icons/404.svg" alt="Imagen de error 404" className="h-100" />
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <ErrorComponent message={t("404.title")} type="error"></ErrorComponent>

        <Footer className="pt-10"/>
      </div>
    </>
  );
}
