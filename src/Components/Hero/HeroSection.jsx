import { getProducts } from "../../services/api";
import FloatingCard from "../FloatingCard/FloatingCard";
import { useTranslation } from "react-i18next";

const products = await getProducts("", 1, 50)

let productList = []
let indexNew = 4

const RandomProductList = (products, indexNew) => {
  for (let index = 0; index < indexNew; index++) {
    let randomProd = products[Math.floor(Math.random() * products.length)]
    if(!productList.includes(randomProd) && productList.length < 4){
      productList.push(randomProd)
    }else{
      if(productList.length < 4){
        indexNew = indexNew < 1 ? indexNew : indexNew - index
        RandomProductList(products, indexNew)
      }
    }    
  }
}

RandomProductList(products, indexNew) 

export default function HeroSection({ handleScroll }) {
  const { t } = useTranslation();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #f9d0e8 0%, #e8d5f5 35%, #cdd8f8 70%, #b8cef6 100%)"
      }}
    >
      <div
        className="absolute w-130 h-130 -top-30 -left-25"
        style={{ background: "rgba(255, 200, 230, 0.45)" }}
      />
      <div
        className="absolute w-100 h-100 bottom-0 -right-20"
        style={{ background: "rgba(180, 160, 240, 0.35)" }}
      />
      <div
        className="absolute w-65 h-65 top-[30%] right-[15%]"
        style={{ background: "rgba(160, 200, 255, 0.3)" }}
      />

      <div className=" pointer-events-none z-5 hidden md:block">
        <FloatingCard product={productList[0]} position={"top-[18%] left-[5%]"}  />
        <FloatingCard product={productList[1]} position={"bottom-[22%] left-[8%]"}  />
        <FloatingCard product={productList[2]} position={"top-[22%] right-[5%]"}  />
        <FloatingCard product={productList[3]} position={"bottom-[18%] right-[7%]"}  />
      </div>

      <div className="relative z-10 text-center max-w-3xl px-6">
        <h1
          className="fade-up fade-up-d2 font-serif font-black leading-[1.08] mb-5"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(42px, 6.5vw, 78px)",
            color: "#2d1a5c",
          }}
        >
          {t("hero.title")}
          <span className="gradient-text"> {t("hero.titleHighlight")}</span>
        </h1>
        <p
          className="fade-up fade-up-d3 text-[17px] font-light leading-relaxed max-w-xl mx-auto mb-10"
          style={{ color: "#5a4080" }}
        >
          {t("hero.subtitle")}
        </p>
        <div className="fade-up fade-up-d4 flex flex-wrap gap-4 justify-center">
          <button
            className="btn-primary px-10 py-4 rounded-full text-white font-medium text-[15px]"
            style={{
              background: "linear-gradient(135deg, #9055e5, #6a3dc7)",
              boxShadow: "0 8px 28px rgba(130, 70, 220, 0.38)",
              border: "none",
            }}
            onClick={handleScroll}
          >
            {t("hero.cta")}
          </button>
        </div>
      </div>
    </section>
  );
}