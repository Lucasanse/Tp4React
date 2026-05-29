import React from "react";
import { useTranslation } from "react-i18next";

const SNCard = ({ 
    accentColor, 
    pillColor, 
    pillText, 
    pillLabel, 
    questionKey, 
    answerKey }) => {
  const { t } = useTranslation();

  return (
    <div
      className="sn-card rounded-2xl p-7 backdrop-blur-md"
      style={{
        background: "rgba(255,255,255,0.62)",
        border: "1px solid rgba(255,255,255,0.85)",
        boxShadow: "0 4px 24px rgba(120, 80, 200, 0.10)",
      }}
    >
      {/* Card top row */}
      <div className="flex items-center gap-3 mb-4">
        <span
          className={"text-2xl leading-none"}
          style={{ color: accentColor }}
        >
        </span>

        <span
          className="sn-pill text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
          style={{ background: pillColor, color: pillText }}
        >
          {t(pillLabel)}
        </span>

        <div
          className="flex-1 h-px rounded-full"
          style={{ background: accentColor, opacity: 0.2 }}
        />
      </div>
      <h2
        className="font-bold text-xl mb-3"
        style={{ fontFamily: "'Playfair Display', serif", color: "#2d1a5c" }}
      >
        {t(questionKey)}
      </h2>

      {/* Answer */}
      <p className="text-[15px] leading-relaxed" style={{ color: "#5a4a7a" }}>
        {t(answerKey)}
      </p>
    </div>
  );
};

export default SNCard;