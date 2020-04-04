import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Spacer from "../components/Spacer";
import GridLayout from "../components/GridLayout";
import Layout from "../components/Layout";
import { Theme } from "../App";
import { GET_SERIES } from "../graphql/series";
import { useHistory } from "react-router-dom";
import Typography from '../components/Typography';
import { Palette } from "../components/Layout";

const RoundPicture = ({ src, alt, size = "m" }: any): ReactElement => {
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
    // @ts-ignore
    <div style={styles[size]}>
      {/* @ts-ignore */}
      <img style={styles.image} src={src} alt={alt} />
    </div>
  )
}

const Background = ({ nendoroids }: any): ReactElement => {
  const styles = {
    root: {
      height: "100%",
      width: "100%",
      zIndex: 1,
      position: "absolute",
      display: "flex",
    },
    image: {
      height: "100%",
      width: "100%",
      display: "flex",
    },
    i: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      overflow: "hidden",
      transform: "skew(5px)"
    }
  }
  return (
    // @ts-ignore
    <div style={styles.root}>
      {nendoroids.slice(0, 5).map(({ images }: any) => {
        return (
          <div style={styles.image}>
            {/* @ts-ignore */}
            <img style={styles.i} src={images[0]} alt="j" />
          </div>
        )
      })}
    </div>
  )
}

const Card = ({ id, name, nendoroids, path }: any) => {
  const theme = Theme.useContainer();
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
      position: "relative",
      // border: "3px solid blue",
    },
    nendos: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }
  }
  return (
    // @ts-ignore
    <div style={styles.root} onClick={() => history.push(path)}>
      {/* @ts-ignore */}
      <div style={{ padding: "0.5rem", backgroundColor: Palette[theme.theme].transparent, position: "relative", zIndex: 2, height: "100%", width: "100%", backdropFilter: "blur(2px)", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <Typography text={name} type="h3" textAlign="center" />
        <Typography text={nendoroids.length} type="body1" textAlign="center" />
      </div>
      <Background nendoroids={nendoroids} />
    </div>
  )
}

function Series(): ReactElement {
  console.log(("Series"))
  let { data, loading, error, fetchMore } = useQuery(GET_SERIES, {
    // @ts-ignore
    start: 0,
  });

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error.message} />
  }

  if (data) {
    return (
      <Layout>
        <GridLayout itemsPerRow={5} rowHeight={200}>
          {
            data.series.map(({ id, name, nendoroids }: any) => <Card key={id} id={id} nendoroids={nendoroids} name={name} path={`/serie/${id}`} />)
          }
        </GridLayout>
        <div onClick={() => fetchMore({
          variables: { start: data.series.length }, updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return Object.assign({}, prev, {
              series: [...prev.series, ...fetchMoreResult.series]
            });
          }
        })}>
          <Typography type="h3" text="More" textAlign="center" />
        </div>
      </Layout>
    );
  }

  return <></>;
}

export default Series;
