import React, { useState, ReactElement } from "react";
import Typography from "./Typography";
import { useHistory } from "react-router-dom";
import { Palette } from "./Layout";
import { Theme } from "../App";


const Button = ({ label, path, fill = false }: any): ReactElement => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();
  const theme = Theme.useContainer();
  const styles = {
    root: {
      height: fill ? "100%" : "117px",
      width: fill ? "100%" : "223px",
      padding: "10px",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation1,
      cursor: "pointer",
    },
    wrapper: {
      height: "100%",
      width: "100%",
      // @ts-ignore
      border: `1px solid ${Palette[theme.theme].secondary}`,

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      transition: "all 0.2s ease",
    },
    isActive: {
      height: "100%",
      width: "100%",
      // @ts-ignore
      border: `1px solid ${Palette[theme.theme].secondary}`,
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "all 0.2s ease",

    }
  }

  return (
    <div style={styles.root} onClick={() => history.push(path)} onMouseEnter={() => { setIsActive(true); }} onMouseLeave={() => { setIsActive(false); }}>
      <div style={isActive ? styles.isActive : styles.wrapper}>
        <Typography type="body1" text={label} textAlign="center" />
      </div>
    </div>
  )
}

export default Button;