import React, { ReactElement } from 'react';
import '../Reset.css';
import FeaturedImage from "../components/FeaturedImage";
import Layout from "../components/Layout";

function Home(): ReactElement {
  console.log(("Home"))
  return (
    <Layout>
      <div style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%" }}>
        <FeaturedImage />
      </div>
    </Layout>
  );
}

export default Home;
