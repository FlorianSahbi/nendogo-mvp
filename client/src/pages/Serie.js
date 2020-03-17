import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spacer from "../components/Spacer";
import Layout from "../components/Layout";
import GridLayout from "../components/GridLayout";

const GET_NENDOROIDS = gql`
  query Nendo($id: ID!) {
    serie(id: $id) {
      id
      name
      nendoroids {
        formattedName
        images
        id
      }
    }
  }
`;

function Serie() {
  console.log(("Serie"))
  const params = useParams();
  const [hover, setHover] = useState(null);
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { id: params.id } });
  const styles = {
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      width: "100%",
      backgroundColor: "#121212",
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
        <div style={content}>
          <GridLayout itemsPerRow={4} rowHeight={200} width={1280}>
            {data.serie.nendoroids.map(({ id, formattedName }) => <Button onHoverButton={(f) => setHover(f)} fill label={formattedName} path={`/nendoroid/${id}`} />)}
          </GridLayout>
        </div>
      </Layout>
    );
  }
}

export default Serie;
