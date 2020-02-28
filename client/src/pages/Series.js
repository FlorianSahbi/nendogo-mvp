import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from "../components/Button";
import Nendoroids from './Nendoroids';
import Loader from "../components/Loader";

const GET_NENDOROIDS = gql`
  query {
    series {
      id
      name
      nendoroids {
        name
        images
      }
    }
  }
`;

function Series() {
  const { data, loading, error } = useQuery(GET_NENDOROIDS);
  const [preview, setPreview] = useState([]);
  const styles = {
    root: {
      height: "100vh",
      width: "100vw",
      backgroundColor: "#121212",
      display: "flex",
      flexDirection: "row",
    },
    preview: {
      width: "40vw",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      // flexWrap: "noWrap",
    },
    list: {
      padding: "10px",
      display: "grid",
      gridAutoRows: "100px",
      gridTemplateColumns: "repeat(7, 1fr)",
      gridGap: "5px",
      width: "100%",
      justifyItems: "center",
      alignItems: "center",

      overflow: "auto",
      width: "100%",

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

        <div style={styles.preview}>
          {preview.map((nendo) => nendo.images).map(img => img[0] || img[1]).map(img => {
            return (
              <div style={{ width: "100%", height: "50vh" }}>
                <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={img} alt='f' />)
              </div>
            )
          })}
        </div>

        <div style={styles.list}>
          {data.series.map(({ id, name, nendoroids }) => {
            return (
              <div onMouseEnter={() => setPreview(nendoroids)} style={{ height: "100%", width: "100%" }}>
                <Button onHoverButton={() => {}} label={name} fill path={`/serie/${id}`} />
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default Series;
