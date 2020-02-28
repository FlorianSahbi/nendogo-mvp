import React from "react";

const Image = ({ src, alt, round = false, size }) => {
  const styles = {
    root: {
      height: round ? `${size}px` : "100%",
      width: round ? `${size}px` : "100%",
      borderRadius: round ? "50%" : "",
      backgroundColor: "#1F1F1F",
      border: "5px solid #D9D9D9",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: round ? "50%" : "",
    }
  }

  return (
    <div style={styles.root}>
      <img style={styles.image} src={src} alt={alt} />
    </div>
  )
}

export default Image;