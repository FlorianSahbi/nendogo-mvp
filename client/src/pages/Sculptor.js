import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import GridLayout from "../components/GridLayout";
import { GET_NENDOROIDS } from "../graphql/sculptor";
import {Palette} from "../components/Layout";

function Sculptor() {
  console.log(("Sculptor"))
  const params = useParams();
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { chu: params.sculptorName } });
  const styles = {
    root: {
      width: "100%",
      minHeight: "100vh",
      backgroundColor: Palette["light"].elevation0,
    },
  }
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (data) {
    return (
      <div style={styles.root}>
        <GridLayout itemsPerRow={4} rowHeight={200} width={1280}>
          {
            data.sculptors.map(({ name }) => <Button label={name} />)
          }
        </GridLayout>
      </div>
    );
  }
}

export default Sculptor;
