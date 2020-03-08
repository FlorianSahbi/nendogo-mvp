import React from 'react';
import { useQuery } from '@apollo/client';
import Button from "../components/Button";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spacer from "../components/Spacer";
import { GET_SCULPTORS } from "../graphql/sculptors";

function Feed({ sculptors, rows = 4, height = 200 }) {
  const styles = {
    root: {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: `repeat(${rows}, 1fr)`,
      gridAutoRows: `${height}px`,
      gridGap: "10px",
    }
  }
  const { root } = styles;

  return (
    <div style={root}>
      {sculptors.map(({ name }) => <Button onHoverButton={() => { }} label={name} fill path={`/sculptor/${name}`} />)}
    </div>
  )
}

function Sculptors() {
  const { data, loading, error } = useQuery(GET_SCULPTORS);
  const styles = {
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100%",
      width: "100%",
      minWidth: "1280px",
      backgroundColor: "#121212",
    },
    wrapper: {
      width: "1280px",
    }
  }
  const { content, wrapper } = styles;

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (data) {
    return (
      <>
        <Header />
        <section style={content}>
          <div style={wrapper}>
            <Spacer spacing={3} />
            <Feed sculptors={data.sculptors} />
            <Spacer spacing={3} />
          </div>
        </section>
        <Footer />
      </>
    );
  }
}

export default Sculptors;
