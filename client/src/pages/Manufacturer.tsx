import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import GridLayout from "../components/GridLayout";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import { GET_MANUFACTURER } from "../graphql/manufacturer";
import Card from "../components/Card";

function Manufacturer(): ReactElement {
  console.log(("Manufacturer"));
  const params: any = useParams();
  const id: any = params.id;
  const { data, loading, error } = useQuery(GET_MANUFACTURER, { variables: { id } });

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>{error.message}</p>
  }

  if (data) {
    return (
      <Layout>
        <GridLayout itemsPerRow={5} rowHeight={200}>
          {data.manufacturer.nendoroids.map(({ id, formattedName, number, images }: any) => <Card key={id} images={images} number={number} formattedName={formattedName} path={`/nendoroid/${id}`} />)}
        </GridLayout>
      </Layout>
    );
  }

  return <></>
}

export default Manufacturer;
