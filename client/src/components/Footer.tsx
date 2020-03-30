import React, { ReactElement } from "react";
import Typography from "./Typography";
import { Palette } from "./Layout";
import { Theme } from "../App";

const Footer = (): ReactElement => {
  const theme = Theme.useContainer();
  const styles = {
    root: {
      height: "100px",
      // @ts-ignore
      borderTop: `2px solid ${Palette[theme.theme].secondary}`,
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