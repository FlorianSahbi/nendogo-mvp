import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Card from "../components/Card";
import Layout from "../components/Layout";
import GridLayout from "../components/GridLayout";
import { GET_NENDOROIDS } from "../graphql/serie";
import { Palette } from "../components/Layout";
import { Theme } from "../App";

function Serie(): ReactElement {
  const theme = Theme.useContainer();
  console.log(("Serie"))
  const params = useParams();
  // @ts-ignore
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { id: params.id } });
  const styles = {
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation0,
    },
  }
  const { content } = styles;

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data) {
    return (
      <Layout>
        {/* @ts-ignore */}
        <div style={content}>
          <GridLayout itemsPerRow={4} rowHeight={200}>
            {data.serie.nendoroids.map(({ id, formattedName, images, number }: any) => <Card key={id} id={id} images={images} number={number} formattedName={formattedName} path={`/nendoroid/${id}`} />)}
          </GridLayout>
        </div>
      </Layout>
    );
  }

  return <></>;
}

export default Serie;
