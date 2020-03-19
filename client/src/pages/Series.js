import React from 'react';
import { useQuery } from '@apollo/client';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Spacer from "../components/Spacer";
import GridLayout from "../components/GridLayout";
import Layout from "../components/Layout";
import { GET_SERIES } from "../graphql/series";
import { useHistory } from "react-router-dom";
import Typography from '../components/Typography';

const RoundPicture = ({ src, alt, size = "m" }) => {
  const styles = {
    s: {
      height: "32px",
      width: "32px",
      borderRadius: "50%",
    },
    m: {
      height: "40px",
      width: "40px",
      borderRadius: "50%",
    },
    l: {
      height: "48px",
      width: "48px",
      borderRadius: "50%",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: "50%",
      objectPosition: "center",
    }
  }
  return (
    <div style={styles[size]}>
      <img style={styles.image} src={src} alt={alt} />
    </div>
  )
}

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
      flexDirection: "column",
      // border: "2px solid blue",
    },
    nendos: {
      width: "100%",
      // border: "2px solid blue",
      display: "flex",
      justifyContent: "center",
    }
  }
  return (
    <div style={styles.root} onClick={() => history.push(path)}>
      <Typography text={name} type="h3" textAlign="center" />
      <Typography text={nendoroids.length} type="body1" textAlign="center" />
      <Spacer direction="vertical" spacing={1} />
      <div style={styles.nendos}>
        {nendoroids.slice(0, 5).map(({ images }) => <RoundPicture src={images[0]} alt={`${id}-image`} size="l" />)}
      </div>
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
              data.series.map(({ id, name, nendoroids }) => <Card key={id} id={id} nendoroids={nendoroids} name={name} path={`/serie/${id}`} />)
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
