import React from "react";

const palette = {
  main: "#F0E6D1",
  secondary: "#D9D9D9",
}

const Typography = ({ text, type, textAlign }) => {
  const styles = {
    h3: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24px",
      lineHeight: "28px",
      color: palette.main,
      textAlign: textAlign
    },
    body1: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "1.5rem",
      color: palette.main,
      textAlign: textAlign
    },
    titleNendo: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "5rem",
      lineHeight: "5rem",
      color: palette.main,
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