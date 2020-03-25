import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import GridLayout from "../components/GridLayout";
import { GET_NENDOROIDS } from "../graphql/sculptor";
import { Palette } from "../components/Layout";
import { Theme } from "../App";

function Sculptor() {
  const theme = Theme.useContainer();
  console.log(("Sculptor"))
  const params = useParams();
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { chu: params.sculptorName } });
  const styles = {
    root: {
      width: "100%",
      minHeight: "100vh",
      backgroundColor: Palette[theme.theme].elevation0,
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
            data.sculptors.map(({ id, name }) => <Button key={id} label={name} />)
          }
        </GridLayout>
      </div>
    );
  }
}

export default Sculptor;
