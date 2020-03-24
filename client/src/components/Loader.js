import React from "react";
import logo from "../logo.svg";
import {Palette} from "./Layout";

const Loader = ({ debug, fullscreen = true }) => {
  const styles = {
    root: {
      position: "absolute",
      zIndex: 999,
      height: fullscreen ? "100vh" : "100%",
      width: fullscreen ? "100vw" : "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Palette["light"].elevation0,
    }
  }
  return (
    <div style={styles.root}>
      <img src={logo} alt="title" />
    </div>
  )
}

export default Loader;