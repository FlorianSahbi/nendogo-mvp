import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Error from "../components/Error";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import Card from "../components/Card";
import GridLayout from "../components/GridLayout";
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';
import Typography from '../components/Typography';

const GET_NENDOROIDS = gql`
  query GetNendoroids($min: Int, $max: Int) {
    nendoroids(sort: "number", where: { number_gte: $min, number_lte: $max }) {
      formattedName
      id
      number
      price
      images
      range
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


const Filters = () => {
  const buttons = [
    { label: "000-100", min: 0, max: 100 },
    { label: "101-200", min: 101, max: 200 },
    { label: "201-300", min: 201, max: 300 },
    { label: "301-400", min: 301, max: 400 },
    { label: "401-500", min: 401, max: 500 },
    { label: "501-600", min: 501, max: 600 },
    { label: "601-700", min: 601, max: 700 },
    { label: "701-800", min: 701, max: 800 },
    { label: "801-900", min: 801, max: 900 },
    { label: "901-1000", min: 901, max: 1000 },
    { label: "1001-1100", min: 1001, max: 1100 },
    { label: "1101-1200", min: 1101, max: 1200 },
    { label: "1201-1300", min: 1201, max: 1300 },
  ]
  const styles = {
    root: {
      border: "3px solid blue",
      width: "100%",
      height: "50px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },
    filter: {
      width: "fit-content",
      height: "100%",
      border: "3px solid red",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
    }
  }
  const setFilter = (min, max) => {
    console.log({ min, max })
    localStorage.setItem("nendogo_min", min);
    localStorage.setItem("nendogo_max", max);
  }
  return (
    <div style={styles.root}>
      {buttons.map(({ label, min, max }) => <div onClick={() => setFilter(min, max)} style={styles.filter}><Typography alignItems="center" type="body1" text={label} /></div>)}
    </div>
  )
}


function Nendoroids() {
  console.log(("Nendoroids"))
  const { data, loading, error } = useQuery(GET_NENDOROIDS, {
    variables: { "min": parseInt(localStorage.getItem("nendogo_min")) || 1201, "max": parseInt(localStorage.getItem("nendogo_max")) || 1300 }
  });
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
      <Layout>
        <div style={styles.root}>
          <Filters />
          <GridLayout itemsPerRow={5} rowHeight={350}>
            {data.nendoroids.map(({ id, formattedName, images, number }) => <Card id={id} formattedName={formattedName} number={number} images={images} path={`/nendoroid/${id}`} fill />)}
          </GridLayout>
        </div>
      </Layout>
    );
  }
}

export default Nendoroids;
