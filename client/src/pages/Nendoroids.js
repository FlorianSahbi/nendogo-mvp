import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Spacer from "../components/Spacer";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Card from "../components/Card";
import GridLayout from "../components/GridLayout";
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

const GET_NENDOROIDS = gql`
  query GetNendoroids {
    nendoroids(sort: "number") {
      formattedName
      id
      number
      series
      manufacturer
      price
      images
      range
      sculptor
    }
  }
`;

function LikeButton({ isLiked = false }) {
  const [liked, setLiked] = useState(isLiked)
  const styles = {
    root: {
      position: "absolute",
      top: 0,
      right: 0,
      margin: "1rem",
      zIndex: 9999,
    }
  }

  const removeLike = (e, bool) => {
    e.stopPropagation();
    setLiked(bool);
  }

  const addLike = (e, bool) => {
    e.stopPropagation();
    setLiked(bool);
  }
  return (
    <>
      {
        isLiked
          ? <IoIosHeart style={styles.root} onClick={(e) => removeLike(e, false)} color="red" size="2rem" />
          : <IoIosHeartEmpty style={styles.root} onClick={(e) => addLike(e, true)} color="red" size="2rem" />
      }
    </>
  )
}




function Nendoroids() {
  console.log(("Nendoroids"))
  const { data, loading, error } = useQuery(GET_NENDOROIDS);
  const styles = {
    root: {
      width: "100vw",
      backgroundColor: "#121212",
      padding: "10px",
    },
    list: {
      display: "grid",
      gridAutoRows: "350px",
      gridTemplateColumns: "repeat(5, 1fr)",
      gridGap: "10px",
      width: "100%",
      justifyItems: "center",
      alignItems: "center",
    }
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data) {
    return (
      <div style={styles.root}>
        <Header />
        <Spacer spacing={3} />
        <GridLayout itemsPerRow={5} rowHeight={350}>
          {data.nendoroids.map(({ id, formattedName, images, interactions }) => <Card id={id} interactions={interactions} formattedName={formattedName} images={images} path={`/nendoroid/${id}`} fill />)}
        </GridLayout>
        <Spacer spacing={1} />
        <Footer />
      </div>
    );
  }
}

export default Nendoroids;
