import React from "react";
import logo from "../logo.svg";

const Loader = () => {
  const styles = {
    root: {
      position: "absolute",
      zIndex: 999,
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#121212",
    }
  }
  return (
    <div style={styles.root}>
      <img src={logo} alt="title" />
    </div>
  )
}

export default Loader;