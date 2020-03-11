import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Typography from "../components/Typography";

const Image = ({ src, alt }) => {
  const styles = {
    root: {
      position: "relative",
      height: "100%",
      width: "100%",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  };
  return (
    <div style={styles.root}>
      <img style={styles.image} src={src} alt={alt} />
    </div>
  )
}

const Foreground = ({ name, isActive = false }) => {
  const styles = {
    default: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      transition: "all 0.2s ease",
      zIndex: "1",
      opacity: "0",
    },
    active: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      transition: "all 0.2s ease",
      zIndex: "1",
      opacity: "1",
    },
  };
  return (
    <div style={isActive ? styles.active : styles.default}>
      <Typography text={name} type="h3" textAlign="center" />
    </div>
  )
}

function Card({ id, images, formattedName, path }) {
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
  }
  return (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => history.push(path)}
      style={styles.root}
    >
      <Foreground name={formattedName} isActive={isActive} />
      <Image src={images[0]} alt={`${id}-card`} />
    </div>
  )
}

export default Card;
