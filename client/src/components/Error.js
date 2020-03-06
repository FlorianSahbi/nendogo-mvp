import React from "react";
import logo from "../logo.svg";
import Typography from "./Typography";

const Error = ({ message }) => {
  const styles = {
    root: {
      position: "absolute",
      zIndex: 999,
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "#121212",
    }
  }
  return (
    <div style={styles.root}>
      <img src={logo} alt="title" />
      <Typography text={message} type="body1" textAlign="center" />
    </div>
  )
}

export default Error;