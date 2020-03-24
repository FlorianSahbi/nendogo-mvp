import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Palette = {
  light: {
    text: {
      primary: "#F0E6D1",
    },
    secondary: "#DF0001",
    elevation0: "#121212",
    elevation1: "#1F1F1F",
  },
  dark: {
    text: {
      primary: "#1e2328",
      // primary: "#D9D9D9",
    },
    secondary: "#002598",
    elevation0: "#F6F6F6",
    elevation1: "#E8E9EA",
  }
}

function Layout({ children, header = true, footer = true }) {
  const styles = {
    root: {
      // border: "3px solid #DF0001",
      width: "100%",
      height: "auto",
      boxSizing: "border-box",
      backgroundColor: Palette["light"].elevation0,
      // backgroundColor: "darkgrey"
    }
  }

  return (
    <React.StrictMode>
      <div style={styles.root}>
        {header && <Header />}
        {children}
        {footer && <Footer />}
      </div>
    </React.StrictMode>
  )
}

export default Layout;
