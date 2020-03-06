import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from "../components/Button";
import Loader from "../components/Loader";
import Error from "../components/Error";

const GET_SCULPTORS = gql`
  query {
    sculptors {
      id
      nam
    }
  }
`;

function Sculptors() {
  console.log(("Sculptors"))
  const { data, loading, error } = useQuery(GET_SCULPTORS);
  const styles = {
    root: {
      width: "100vw",
      backgroundColor: "#121212",
      padding: "10px",
    },
    list: {
      display: "grid",
      gridAutoRows: "225px",
      gridTemplateColumns: "repeat(6, 1fr)",
      gridGap: "10px",
      width: "100%",
      justifyItems: "center",
      alignItems: "center",

    }
  }
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <Error message={error.message} />;
  }
  if (data) {
    return (
      <div style={styles.root}>
        <div style={styles.list}>
          {data.sculptors.map(({ name }) => <Button onHoverButton={() => { }} label={name} fill path={`/sculptor/${name}`} />)}
        </div>
      </div>
    );
  }
}

export default Sculptors;