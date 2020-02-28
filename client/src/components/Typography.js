import React from "react";

const Typography = ({ text, type, textAlign }) => {
  const styles = {
    h3: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24px",
      lineHeight: "28px",
      color: "#D9D9D9",
      textAlign: textAlign
    },
    body1: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "1.5rem",
      color: "#D9D9D9",
      textAlign: textAlign
    },
    titleNendo: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "5rem",
      lineHeight: "5rem",
      color: "#D9D9D9",
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