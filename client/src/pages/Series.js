import React from 'react';
import { useQuery } from '@apollo/client';
import Loader from "../components/Loader";
import Error from "../components/Error";
import GridLayout from "../components/GridLayout";
import Layout from "../components/Layout";
import { GET_SERIES } from "../graphql/series";
import { useHistory } from "react-router-dom";
import Typography from '../components/Typography';

const Card = ({ id, name, nendoroids, path }) => {
  const history = useHistory();

  const styles = {
    root: {
      cursor: "pointer",
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }
  }
  return (
    <div style={styles.root} onClick={() => history.push(path)}>
      <Typography text={name} type="h3" textAlign="center" />
      <Typography text={nendoroids.length} type="body1" textAlign="center" />
    </div>
  )
}

function Series() {
  console.log(("Series"))
  let { data, loading, error, fetchMore } = useQuery(GET_SERIES, {
    start: 0,
  });
  const styles = {
    content: {
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#121212",
      padding: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  };
  const { content } = styles;

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data) {
    return (
      <Layout>
        <section style={content}>
          <GridLayout itemsPerRow={4} rowHeight={200} width={1280}>
            {
              data.series.map(({ id, name, nendoroids }) => <Card key={id} nendoroids={nendoroids} name={name} path={`/serie/${id}`} />)
            }
          </GridLayout>
          <div onClick={() => fetchMore({
            variables: { start: data.series.length }, updateQuery: (prev, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prev;
              return Object.assign({}, prev, {
                series: [...prev.series, ...fetchMoreResult.series]
              });
            }
          })}>More</div>
        </section>
      </Layout>
    );
  }
}

export default Series;
