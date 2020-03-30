import React, { ReactElement } from "react";
import logo from "../logo.svg";
import { Palette } from "./Layout";
import { Theme } from "../App";

const Loader = ({ debug, fullscreen = true }: any): ReactElement => {
  const theme = Theme.useContainer();
  const styles = {
    root: {
      position: "absolute",
      zIndex: 999,
      height: fullscreen ? "100vh" : "100%",
      width: fullscreen ? "100vw" : "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation0,
    }
  }
  return (
    // @ts-ignore
    <div style={styles.root}>
      <img src={logo} alt="title" />
    </div>
  )
}

export default Loader;