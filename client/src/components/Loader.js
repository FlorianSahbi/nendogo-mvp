import React from "react";
import logo from "../logo.svg";

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
      backgroundColor: "#121212",
      border: "3px solid yellow",
    }
  }
  return (
    <div style={styles.root}>
      <img src={logo} alt="title" />
    </div>
  )
}

export default Loader;