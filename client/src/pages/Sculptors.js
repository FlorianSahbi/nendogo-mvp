import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from "../components/Button";
import Loader from "../components/Loader";

const GET_SCULPTORS = gql`
  query {
    sculptors {
      id
      name
    }
  }
`;

function Sculptors() {
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
    return <p>{error.message}</p>
  }
  if (data) {
    return (
      <div style={styles.root}>
        <div style={styles.list}>
          {data.sculptors.map(({ name }) => <Button onHoverButton={() => {}} label={name} fill path={`/sculptor/${name}`} />)}
        </div>
      </div>
    );
  }
}

export default Sculptors;