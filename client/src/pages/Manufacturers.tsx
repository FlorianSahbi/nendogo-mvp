import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import Button from "../components/Button";
import Layout from "../components/Layout";
import GridLayout from "../components/GridLayout";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { GET_MANUFACTURERS } from "../graphql/manufacturers";

function Manufacturers(): ReactElement {
  console.log(("Manufacturers"))
  const { data, loading, error } = useQuery(GET_MANUFACTURERS);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data) {
    return (
      <Layout>
        <GridLayout itemsPerRow={5} rowHeight={200}>
          {data.manufacturers.map(({ id, name }: any) => <Button key={id} label={name} fill path={`/manufacturer/${id}`} />)}
        </GridLayout>
      </Layout>
    );
  }

  return <></>;
}

export default Manufacturers;
