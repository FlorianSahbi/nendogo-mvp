import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import GridLayout from "../components/GridLayout";
import { GET_SCULPTOR } from "../graphql/sculptor";
import { Palette } from "../components/Layout";
import { Theme } from "../App";

function Sculptor() {
  const theme = Theme.useContainer();
  console.log(("Sculptor"))
  const params = useParams();
  const id = params.id;
  const { data, loading, error } = useQuery(GET_SCULPTOR, { variables: { id } });
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
      <Layout>

        <GridLayout itemsPerRow={4} rowHeight={200}>
          {data.sculptor.nendoroids.map(({ id, formattedName, number, images }) => <Card key={id} path={`/nendoroid/${id}`} formattedName={formattedName} number={number} images={images} />)}
        </GridLayout>
      </Layout>
    );
  }
}

export default Sculptor;
