import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from "../components/Button";

const GET_MANUFACTURERS = gql`
  query {
    manufacturers {
      id
      name
    }
  }
`;

function Manufacturers() {
  const { data, loading, error } = useQuery(GET_MANUFACTURERS);
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
    return <p>Loading...</p>
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (data) {
    return (
      <div style={styles.root}>
        <div style={styles.list}>
          {data.manufacturers.map(({ name }) => <Button onHoverButton={() => {}} label={name} fill path={`/manufacturer/${name}`} />)}
        </div>
      </div>
    );
  }
}

export default Manufacturers;
