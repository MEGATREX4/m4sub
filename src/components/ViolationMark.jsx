import React from "react";

export default function ViolationMark({ type, className = '' }) {
  // --- Нова палітра, інтегрована в стиль сайту ---
  const isMajor = type === "major";
  
  // Основний колір
  const baseColor = isMajor ? "#c5629a" : "#0891b2"; // Рожевий або бірюзовий
  
  // Колір для першого шару тіні (трохи темніший)
  const shadowColor = isMajor ? "#8e406e" : "#0e7490";
  
  const label = isMajor ? "Тяжке порушення" : "Легке порушення";
      
  return (
    <span
      title={label}
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        background: baseColor,
        borderRadius: 0, // Залишаємо квадратним
        marginRight: 6, // Збільшимо відступ для тіні
        verticalAlign: "middle",
        // Використовуємо об'ємну тінь, як на інших елементах сайту
        boxShadow: `1px 1px 0 ${shadowColor}, 2px 2px 0 #111`,
      }}
      className={className}
      aria-label={label}
    />
  );
}