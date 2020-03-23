import React from 'react';
import '../Reset.css';
import { useQuery, gql } from '@apollo/client';
import Spacer from "../components/Spacer";
import Card from "../components/Card";
import Typography from "../components/Typography";
import FeaturedImage from "../components/FeaturedImage";
import Layout from "../components/Layout";

const DotIndicator = ({ onClick }) => {
  const styles = {
    root: {
      height: "10px",
      width: "10px",
      borderRadius: "50%",
      backgroundColor: "#d9d9d9",
    },
    wrapper: {
      height: "25px",
      width: "25px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    }
  }
  return (
    <div style={styles.wrapper} onClick={onClick}>
      <div style={styles.root} />
    </div>
  )
}

const Pagination = ({ element, pages }) => {

  const GET_NENDOROIDS_PAGINATION = gql`
    query GetNendoroidsPagination($limit: Int, $start: Int, $currentUser: String) {
      nendoroids(limit: $limit, start: $start, sort: "number") {
        id
        formattedName
        images
        number
        interactions(where:{user:{id: "3243232432"}}) {
          id
        }
      }
    }
  `;

  const { data, loading, error, fetchMore } = useQuery(GET_NENDOROIDS_PAGINATION, {
    variables: {
      limit: element,
      start: 0,
      currentUser: "3243232432"
    },
  });


  const initDots = () => {
    let dots = [];
    for (let i = 0; i < pages; i++) {
      dots = [...dots, <DotIndicator onClick={() => fetchMore({ variables: { start: i * element } })} />]
    }
    return dots;
  }

  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${element}, 1fr)`, gridTemplateRows: "1fr", height: "400px" }}>
        {data && data.nendoroids.map(({ id, images, formattedName, interactions }) => <Card id={id} interactions={interactions} images={images} formattedName={formattedName} path={`/nendoroid/${id}`} />).sort(function (a, b) { return a.value + b.value })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>

        {initDots()}
      </div>
    </>
  )

}

function Home() {
  console.log(("Home"))

  return (
    <Layout>
      <div style={{ padding: "1rem", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", width: "100%" }}>
        <FeaturedImage />
      </div>

      <Spacer spacing={2} />

      <div style={{ padding: "1rem", display: "flex", flexDirection: "column", backgroundColor: "#202020", width: "100%" }}>
        <div style={{ width: "100%", paddingLeft: "10px" }}>
          <Typography text="Latest Nendoroids" type="h3" />
        </div>
        <div style={{ width: "100%" }}>
          <Pagination element={5} pages={5} />
        </div>
      </div>
    </Layout>
  );

}

export default Home;
