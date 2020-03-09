import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Card({ id, image, formattedName, path }) {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const styles = {
    root: {
      zIndex: 1,
      cursor: "pointer",
      height: "100%",
      width: "100%",
      backgroundColor: "#1F1F1F",
      position: "relative",
      overflow: "hidden",
    },
    imgWrapper: {
      position: "relative",
      height: "100%",
      width: "100%",
    },
    img: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    foreground: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      flexDirection: "column",
      height: "100%",
      width: "100%",
      top: "120%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      transition: "all 0.2s ease",

      textAlign: "center",
      color: "white",
    },
    foregroundHover: {
      display: "flex",
      flexDirection: "column",

      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      top: "0%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      transition: "all 0.2s ease",

      textAlign: "center",
      color: "white",
    },
  }
  return (
    <div onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} onClick={() => history.push(path)} style={styles.root} >
      <likeButton />
      <div style={styles.imgWrapper}>
        <div style={isActive ? styles.foregroundHover : styles.foreground}>
          {formattedName}
        </div>
        <img style={styles.img} src={image[0]} />
      </div>
    </div >
  )
}

export default Card;
