import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ chilren }) {
  return (
    <>
      <Header />
      {chilren}
      <Layout />
    </>
  )
}

export default Layout;