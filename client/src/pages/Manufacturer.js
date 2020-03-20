import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { GET_NENDOROIDS } from "../graphql/manufacturer";

function Manufacturer() {
  console.log(("Manufacturer"))
  const params = useParams();
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { chu: params.manufacturerName } });
  const styles = {
    root: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: "#121212",
    },
    list: {
      display: "grid",
      gridAutoRows: "auto",
      gridTemplateColumns: "repeat(5, 1fr)",
      gridGap: "10px",
    }
  }
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (data) {
    return (
      <Layout>
        <div style={styles.root}>
          <div style={styles.list}>
            {data.manufacturers.map(({ name }) => <Button label={name} />)}
          </div>
        </div>
      </Layout>
    );
  }
}

export default Manufacturer;
