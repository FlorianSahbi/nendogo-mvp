import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Typography from "../components/Typography";
import Loader from "../components/Loader";
import Spacer from "../components/Spacer";
import Footer from "../components/Footer";
import Card from "../components/Card";

const GET_NENDOROIDS = gql`
  query GetNendoroid($chu: ID!) {
    nendoroid(id: $chu) {
    formattedName
    id
    number
    manufacturer
    price
    images
    range
    sculptor
    title
    description
    serie {
        id
        name
        nendoroids {
          formattedName
          images
          id
        }
      }
    }
  }
`;

const RelatedProduct = ({ nendoroids }) => {
  const params = useParams();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
      {nendoroids.filter(n => n.id !== params.id).map(({ id, images, formattedName }) => <Card key={id} id={id} images={images} formattedName={formattedName} path={`/nendoroid/${id}`} />)}
    </div>
  )
}

function Nendoroid() {
  console.log(("Nendoroid"))
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { data, loading, error } = useQuery(GET_NENDOROIDS, {
    variables: { chu: params.id },
  });

  const styles = {
    root: {
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#121212",
    },
    listWrapper: {
      backgroundColor: "#202020",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      width: "100vw",
    },
    list: {
      display: "flex",
      backgroundColor: "#121212",
      padding: "10px",
      width: "100%",
      height: "400px",
      overflowX: "scroll",
    },
    preview: {
      height: "70vh",
      width: "100%",
    },
    foreground: {
      position: "absolute",
      zIndex: "9",
      height: "70vh",
      width: "100%",
      background: "linear-gradient(180deg,rgba(0,0,0,0) 65%, rgba(10,10,12,.1) 70%, #121212 90%)",
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
    }
  }
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (data) {
    const { formattedName, images, title, description, serie } = data.nendoroid;
    return (
      <div style={styles.root}>

        <div style={styles.preview}>
          <div style={styles.foreground} >
            <Typography text={formattedName} type="titleNendo" textAlign="center" />
          </div>
          <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={images[0]} alt={formattedName} />
        </div>
        <Spacer spacing={2} />

        <Typography text={title} type="h3" textAlign="center" />

        <Spacer spacing={1} />
        <div style={{ width: "900px", alignSelf: "center" }}>
          {description.map(decr => <Typography text={decr} type="body1" textAlign="center" />)}
        </div>

        <Spacer spacing={2} />


        <div style={styles.listWrapper}>
          <div style={styles.list}>
            {images.map(i => {
              return (
                <div style={{ height: "100%", minWidth: "19vw", padding: "1rem" }}>
                  <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={i} alt={formattedName} />
                </div>
              )
            })}
          </div>
        </div>

        <Spacer spacing={3} />

        <RelatedProduct nendoroids={serie.nendoroids} />

        <Spacer spacing={3} />

        <Footer />

      </div>
    );
  }
}

export default Nendoroid;
