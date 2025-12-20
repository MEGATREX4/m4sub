// src/components/pages/Obs.jsx
import { useEffect } from "react";
import ObsWidget from "../ObsWidget";

export default function Obs() {
  useEffect(() => {
    document.body.style.background = "transparent";
    document.body.style.overflow = "hidden";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    
    return () => {
      document.body.style.background = "";
      document.body.style.overflow = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  return (
    <div
      style={{
        width: "1920px",
        height: "1080px",
        backgroundColor: "transparent",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <ObsWidget />
    </div>
  );
}