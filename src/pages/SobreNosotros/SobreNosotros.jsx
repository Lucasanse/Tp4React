import React from "react";
import { useTranslation } from "react-i18next";
import { Header } from "../../Components/Header/Header";
import { Footer } from "../../Components/Footer/Footer";
import SNCard from "./SNCard";
import "./SobreNosotros.css";

const SobreNosotros = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header navigation={navigation} />

      <main
        className="grow relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #f9d0e8 0%, #e8d5f5 35%, #cdd8f8 70%, #b8cef6 100%)",
        }}
      >
        <div
          className="sn-blob-1 absolute w-120 h-120 -top-25 -left-25 pointer-events-none"
          style={{ background: "rgba(255, 200, 230, 0.45)" }}
        />
        <div
          className="sn-blob-2 absolute w-95 h-95 -bottom-20 -right-20 pointer-events-none"
          style={{ background: "rgba(180, 160, 240, 0.35)" }}
        />
        <div
          className="sn-blob-3 absolute w-60 h-60 top-[40%] right-[10%] pointer-events-none"
          style={{ background: "rgba(160, 200, 255, 0.28)" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-40">
          <h1
            className="sn-fade-d1 text-center font-black leading-tight mb-10"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(38px, 6vw, 68px)",
              color: "#2d1a5c",
            }}
          >
            {t("SobreNosotros.title")}
          </h1>


          <div className="sn-fade-d2 flex justify-center">
            <div className="sn-shimmer-bar h-0.75 w-24 rounded-full" />
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-7">
            <div className="sn-fade-d3">
              <SNCard
                icon="✦"
                iconDelay="sn-float"
                accentColor="#9b55e0"
                pillColor="rgba(155, 85, 224, 0.15)"
                pillText="#7040b0"
                pillLabel="SobreNosotros.pill1"
                questionKey="SobreNosotros.question"
                answerKey="SobreNosotros.answer"
              />
            </div>
            <div className="sn-fade-d4">
              <SNCard
                icon="◈"
                iconDelay="sn-float-d1"
                accentColor="#c471b5"
                pillColor="rgba(196, 113, 181, 0.15)"
                pillText="#a0408c"
                pillLabel={t("SobreNosotros.pill2")}
                questionKey="SobreNosotros.question2"
                answerKey="SobreNosotros.answer2"
              />
            </div>
            <div className="sn-fade-d5">
              <SNCard
                icon="◉"
                iconDelay="sn-float-d2"
                accentColor="#7cacf8"
                pillColor="rgba(124, 172, 248, 0.15)"
                pillText="#2563b0"
                pillLabel={t("SobreNosotros.pill3")}
                questionKey="SobreNosotros.question3"
                answerKey="SobreNosotros.answer3"
              />
            </div>
          </div>
          <div className="sn-fade-d5 flex justify-center mt-16">
            <div className="sn-shimmer-bar h-0.75 w-16 rounded-full" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SobreNosotros;