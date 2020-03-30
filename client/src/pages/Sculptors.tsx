import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import Button from "../components/Button";
import Loader from "../components/Loader";
import Error from "../components/Error";
import GridLayout from "../components/GridLayout";
import Layout from "../components/Layout";
import { GET_SCULPTORS } from "../graphql/sculptors";

function Sculptors(): ReactElement {
  const { data, loading, error } = useQuery(GET_SCULPTORS);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (data) {
    return (
      <Layout>
        <GridLayout itemsPerRow={5} rowHeight={200}>
          {
            data.sculptors.map(({ id, name }: any) => <Button key={id} label={name} fill path={`/sculptor/${id}`} />)
          }
        </GridLayout>
      </Layout>
    );
  }
  return <></>;
}

export default Sculptors;
