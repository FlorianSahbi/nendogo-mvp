import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, header = true, footer = true }) {
  return (
    <>
      {header && <Header />}
      {children}
      {footer && <Footer />}
    </>
  )
}

export default Layout;