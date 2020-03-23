import React from 'react';
import Layout from "../components/Layout";
import NendoroidsFeed from "../components/NendoroidsFeed";

function Nendoroids() {
  console.log(("Nendoroids"))

  return (
    <Layout>
      <NendoroidsFeed filters />
    </Layout>
  );
}

export default Nendoroids;
