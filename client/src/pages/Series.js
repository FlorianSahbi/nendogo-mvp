import React from 'react';
import { useQuery } from '@apollo/client';
import Button from "../components/Button";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import Footer from "../components/Footer";
import Error from "../components/Error";
import GridLayout from "../components/GridLayout";
import { GET_SERIES } from "../graphql/series";

function Series() {
  console.log(("Series"))
  const { data, loading, error } = useQuery(GET_SERIES);
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
      <>
        <Header />
        <section style={content}>
          <Spacer spacing={1} />
          <GridLayout itemsPerRow={4} rowHeight={200} width={1280}>
            {
              data.series.map(({ id, name }) => <Button onHoverButton={() => { }} label={name} fill path={`/serie/${id}`} />)
            }
          </GridLayout>
          <Spacer spacing={1} />
        </section>
        <Footer />
      </>
    );
  }
}

export default Series;
