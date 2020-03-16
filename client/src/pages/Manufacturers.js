import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from "../components/Button";
import Layout from "../components/Layout";
import GridLayout from "../components/GridLayout";
import Loader from "../components/Loader";
import Error from "../components/Error";


const GET_MANUFACTURERS = gql`
  query {
    manufacturers {
      id
      name
    }
  }
`;

function Manufacturers() {
  console.log(("Manufacturers"))
  const { data, loading, error } = useQuery(GET_MANUFACTURERS);
  const styles = {
    content: {
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#121212",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
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
        <div style={styles.content}>
          <GridLayout itemsPerRow={4} rowHeight={200} width={1280}>
            {data.manufacturers.map(({ name }) => <Button label={name} fill path={`/manufacturer/${name}`} />)}
          </GridLayout>
        </div>
      </Layout>
    );
  }
}

export default Manufacturers;
