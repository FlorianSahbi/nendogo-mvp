import React from "react"
import Header from "./Header";
import Footer from "./Footer";
import { Theme } from "../App";
import { FiSun, FiMoon } from 'react-icons/fi';
import Spacer from "../components/Spacer";

export const Palette = {
  dark: {
    text: {
      primary: "#F0E6D1",
    },
    secondary: "#F0E6D1",
    elevation0: "#121212",
    elevation1: "#1F1F1F",
    transparent: "#00000080",
  },
  light: {
    text: {
      primary: "#1e2328",
    },
    secondary: "#002598",
    elevation0: "#F6F6F6",
    elevation1: "#E8E9EA",
    transparent: "#ffffff80",
  }
}

function Layout({ children, header = true, footer = true }) {
  const theme = Theme.useContainer();

  const styles = {
    root: {
      width: "100%",
      height: "auto",
      boxSizing: "border-box",
      backgroundColor: Palette[theme.theme].elevation0,
    }
  }

  return (
    <React.StrictMode>
      <div style={styles.root}>
        <div style={{ position: "absolute", top: 0, right: 0, zIndex: 999, padding: "1rem", display: "flex" }}>
          <div onClick={theme.switchDark}><FiMoon style={{ cursor: "pointer" }} size="1.5rem" color={Palette[theme.theme].text.primary} /></div>
          <Spacer direction="horizontal" spacing={.5} />
          <div onClick={theme.switchLight}><FiSun style={{ cursor: "pointer" }} size="1.5rem" color={Palette[theme.theme].text.primary} /></div>
        </div>
        {header && <Header />}
        {children}
        {footer && <Footer />}
      </div>
    </React.StrictMode>
  )
}

export default Layout;
