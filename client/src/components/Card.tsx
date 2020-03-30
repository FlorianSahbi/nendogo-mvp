import React, { useState, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import Typography from "../components/Typography";
import { Palette } from "./Layout";
import { Theme } from "../App";

const Image = ({ src, alt }: any): ReactElement => {
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
    // @ts-ignore
    <div style={styles.root}>
      {/* @ts-ignore */}
      <img style={styles.image} src={src} alt={alt} />
    </div>
  )
}

const Foreground = ({ name, number, isActive = false }: any): ReactElement => {
  const theme = Theme.useContainer();
  const styles = {
    default: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].transparent,
      transition: "opacity 0.2s ease",
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
      // @ts-ignore
      backgroundColor: Palette[theme.theme].transparent,
      transition: "opacity 0.2s ease",
      backdropFilter: "blur(5px)",
      zIndex: "1",
      opacity: "1",
    },
  };
  return (
    // @ts-ignore
    <div style={isActive ? styles.active : styles.default}>
      <Typography text={name} type="h3" textAlign="center" />
      <Typography text={number} type="body1" textAlign="center" />
    </div>
  )
}

function Card({ id, images, formattedName, path, number, loading }: any): ReactElement {
  const theme = Theme.useContainer();
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const styles = {
    root: {
      zIndex: 1,
      cursor: "pointer",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation1,
      position: "relative",
      overflow: "hidden",
    },
    loading: {
      zIndex: 1,
      cursor: "pointer",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation1,
      position: "relative",
      overflow: "hidden",
    },
  }
  if (loading) {
    return (
      // @ts-ignore
      <div style={styles.loading} />
    )
  } else {
    return (
      <div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onClick={() => history.push(path)}
        // @ts-ignore
        style={styles.root}
      >
        <Foreground name={formattedName} number={number} isActive={isActive} />
        <Image src={images[0]} alt={`${id}-card`} />
      </div>
    )
  }
}

export default Card;
