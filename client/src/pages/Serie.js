import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Image from "../components/Image";

const GET_NENDOROIDS = gql`
  query Nendo($chu: ID!) {
    serie(id: $chu) {
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
  const params = useParams();
  const [hover, setHover] = useState(null);
  const { data, loading, error } = useQuery(GET_NENDOROIDS, { variables: { chu: params.id } });
  const styles = {
    root: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: "#121212",
    },
    list: {
      display: "grid",
      gridAutoRows: "auto",
      gridTemplateColumns: "repeat(5, 1fr)",
      gridGap: "10px",
      gridAutoRows: "120px"
    },
    preview: {
      height: "70vh",
      display: "flex",
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
          {data.serie.nendoroids.map(({ formattedName, images }) => {
            if (formattedName === hover) {
              console.log("ok")
              return (
                <div style={{ height: "100%", width: "100%", overflow: "hidden", flexWrap: "nowrap", transition: "all 0.2s ease" }}>
                  <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={images[0]} alt="bleu" />
                </div>
              )
            }
            if (hover === null) {
              console.log("ok")
              return (
                <div style={{ height: "100%", width: "100%", overflow: "hidden", flexWrap: "nowrap", transition: "all 0.2s ease" }}>
                  <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={images[0]} alt="bleu" />
                </div>
              )
            }
            else {
              console.log("ok22")
              return (
                <div style={{ height: "100%", width: "10%", overflow: "hidden", flexWrap: "nowrap", transition: "all 0.2s ease" }}>
                  <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={images[0]} alt="bleu" />
                </div>
              )
            }
          })}
        </div>
        <div style={styles.list}>
          {data.serie.nendoroids.map(({ id, formattedName }) => <Button onHoverButton={(f) => setHover(f)} fill label={formattedName} path={`/nendoroid/${id}`} />)}
        </div>
      </div>
    );
  }
}

export default Serie;
