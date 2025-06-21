import React from "react";

/**
 * ViolationMark component
 * @param {Object} props
 * @param {"major"|"minor"} props.type - Severity type
 */
export default function ViolationMark({ type }) {
  const color = type === "major" ? "#ef4444" : "#facc15"; // red or yellow
  const label =
    type === "major"
      ? "Тяжке порушення (суворе покарання)"
      : "Легке порушення (м'яке покарання)";
  return (
    <span
      title={label}
      style={{
        display: "inline-block",
        width: 14,
        height: 14,
        borderRadius: "50%",
        background: color,
        marginRight: 4,
        verticalAlign: "middle",
        border: "1.5px solid #fff",
        boxShadow: "0 0 0 1px #8882"
      }}
      aria-label={label}
    />
  );
}
