import React from "react";
import { Palette } from "../components/Layout";

const Typography = ({ text, type, textAlign }) => {
  const styles = {
    h3: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24px",
      lineHeight: "28px",
      color: Palette.dark.text.primary,
      textAlign: textAlign
    },
    body1: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "1.5rem",
      color: Palette.dark.text.primary,
      textAlign: textAlign
    },
    titleNendo: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "5rem",
      lineHeight: "5rem",
      color: Palette.dark.text.primary,
      textAlign: textAlign
    },
  }

  return (
    <p style={styles[type]}>
      {text}
    </p>
  )
}

export default Typography;