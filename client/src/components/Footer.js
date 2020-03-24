import React from "react";
import Typography from "./Typography";
import {Palette} from "./Layout";

const Footer = () => {
  const styles = {
    root: {
      height: "100px",
      borderTop: `2px solid ${Palette["light"].secondary}`,
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",
    }
  }
  return (
    <footer style={styles.root}>
      <Typography text="Copyright © 2020 NendoGo. All rights Reserved." type="body1" textAlign="center" />
    </footer>
  )
}

export default Footer;