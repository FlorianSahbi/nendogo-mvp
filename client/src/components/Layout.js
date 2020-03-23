import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export const Palette = {
  dark: {
    text: {
      primary: "#F0E6D1",
    },
    secondary: "#DF0001",
    elevation0: "#121212",
  },
  light: {
    text: {
      primary: "#D9D9D9",
    },
    secondary: "#DF0001",
    elevation0: "#121212",
  }
}

function Layout({ children, header = true, footer = true }) {
  const styles = {
    root: {
      // border: "3px solid #DF0001",
      width: "100%",
      height: "auto",
      boxSizing: "border-box",
      backgroundColor: Palette.dark.elevation0,
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
