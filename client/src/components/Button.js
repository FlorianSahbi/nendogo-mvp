import React, { useState } from "react";
import Typography from "./Typography";
import { useHistory } from "react-router-dom";

const Button = ({ label, path, fill = false }) => {
  const [isActive, setIsActive] = useState(false);
  const history = useHistory();
  const styles = {
    root: {
      height: fill ? "100%" : "117px",
      width: fill ? "100%" : "223px",
      padding: "10px",
      backgroundColor: "#1F1F1F",
      cursor: "pointer",
    },
    wrapper: {
      height: "100%",
      width: "100%",
      border: "1px solid #D9D9D9",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      transition: "all 0.2s ease",
    },
    isActive: {
      height: "100%",
      width: "100%",
      border: "1px solid #D9D9D9",
      backgroundColor: " #121212",
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