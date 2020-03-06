import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";

const GET_NENDOROIDS = gql`
  query Nendo($chu: String) {
    sculptors(where: { name: $chu }) {
      id
      name
    }
  }
`;

const Card = ({ name, images }) => {
  const styles = {
    root: {

    }
  }
  return (
    <div style={{ width: "300px", border: "2px solid green", height: "450px", display: "flex", flexDirection: "column" }}>
      <p>{name}</p>
      <div style={{ width: "100%", height: "100%", border: "2px solid pink", display: "flex", overflow: "hidden" }}>
        <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={images[0]} alt="ouif" />
      </div>
    </div>
  )
}

function Sculptor() {
  console.log(("Sculptor"))
  const params = useParams();
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { chu: params.sculptorName } });
  const styles = {
    root: {
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "#121212",
    },
    list: {
      display: "grid",
      gridAutoRows: "auto",
      gridTemplateColumns: "repeat(5, 1fr)",
      gridGap: "10px",
    }
  }
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (data) {
    return (
      <div style={styles.root}>
        <div style={styles.list}>
          {data.sculptors.map(({ name }) => <Button onHoverButton={() => {}} label={name} />)}
        </div>
      </div>
    );
  }
}

export default Sculptor;
