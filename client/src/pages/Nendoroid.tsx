import React, { useEffect, useState, ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useHistory } from "react-router-dom";
import Typography from "../components/Typography";
import Loader from "../components/Loader";
import Spacer from "../components/Spacer";
import Card from "../components/Card";
import Layout from "../components/Layout";
import { format } from 'date-fns'
import { GET_NENDOROIDS } from "../graphql/nendoroid";
import { Palette } from "../components/Layout";
import { Theme } from "../App";

const Preview = ({ src, isOpen, onClose }: any): ReactElement => {
  const theme = Theme.useContainer();
  const styles = {
    root: {
      height: "100vh",
      width: "100vw",
      position: "fixed",
      zIndex: 999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "5rem",
      //@ts-ignore
      backgroundColor: Palette[theme.theme].transparent2
      // border: "3px solid blue",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "contain",
      // border: "3px solid pink",
    }
  }

  if (isOpen) {
    return (
      //@ts-ignore
      <div style={styles.root} onClick={onClose}>
        {/* @ts-ignore */}
        <img style={styles.image} src={src} />
      </div>
    )
  }
  return <></>
}

const RelatedProduct = ({ nendoroids }: any) => {
  const params = useParams();

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)" }}>
      {/* @ts-ignore */}
      {nendoroids.filter(n => n.id !== params.id).map(({ id, images, formattedName }: any) => <Card key={id} id={id} images={images} formattedName={formattedName} path={`/nendoroid/${id}`} />)}
    </div>
  )
}

const Entity = ({ type, name, path }: any) => {
  const theme = Theme.useContainer();
  const history = useHistory();

  const styles = {
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      cursor: "pointer",
    },
    wrapper: {
      //@ts-ignore
      border: `1px solid ${Palette[theme.theme].secondary}`,
      borderRadius: "50%",
      height: "128px",
      width: "128px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
  }
  return (
    //@ts-ignore
    <div style={styles.root} onClick={() => history.push(path)}>
      <div style={styles.wrapper}>
        <Typography text={name} type="body1" textAlign="center" />
      </div>
      <Spacer direction="vertical" spacing={.5} />
      <Typography text={type} type="h3" textAlign="center" />
    </div>
  )
}

function Nendoroid() {
  const [oPreview, setOPreview] = useState([false, 2]);
  console.log(oPreview)
  const theme = Theme.useContainer();
  console.log(("Nendoroid"))
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { data, loading, error } = useQuery(GET_NENDOROIDS, {
    //@ts-ignore
    variables: { chu: params.id },
  });

  const styles = {
    root: {
      width: "100vw",
      display: "flex",
      flexDirection: "column",
      //@ts-ignore
      backgroundColor: Palette[theme.theme].elevation0,
    },
    listWrapper: {
      //@ts-ignore
      backgroundColor: Palette[theme.theme].elevation1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1rem",
      width: "100vw",
    },
    list: {
      display: "flex",
      //@ts-ignore
      backgroundColor: Palette[theme.theme].elevation0,
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
      //@ts-ignore
      background: `linear-gradient(180deg,transparent 65%, #0a0a0c1a 70%, ${Palette[theme.theme].elevation0} 90%)`,
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
    const { formattedName, images, title, description, series, releaseDate, url, sculptor, manufacturer } = data.nendoroid;
    return (
      <Layout header={false}>
        {/* @ts-ignore */}
        <div style={styles.root}>

          <div style={styles.preview}>
            {/* @ts-ignore */}
            <div style={styles.foreground} >
              <Typography text={formattedName} type="titleNendo" textAlign="center" />
            </div>
            <img style={{ height: "100%", width: "100%", objectFit: "cover" }} src={images[0]} alt={formattedName} />
          </div>
          <Spacer spacing={2} />

          <Typography text={title} type="h3" textAlign="center" />
          {/* <Typography text={format(new Date(releaseDate), 'yyyy/MM')} type="h3" textAlign="center" /> */}
          {/* <Typography text={url} type="body1" textAlign="center" /> */}


          <Spacer spacing={.5} />
          <div style={{ width: "900px", alignSelf: "center" }}>
            {description.map((decr: string) => <Typography key={`${Math.random()}-description-nendoroid`} text={decr} type="body1" textAlign="center" />)}
          </div>
          <Spacer spacing={1} />


          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", width: "900px", alignSelf: "center" }}>
            <Entity type="Series" name={series.name} path={`/serie/${series.id}`} />
            <Entity type="Manufacturer" name={manufacturer.name} path={`/manufacturer/${manufacturer.id}`} />
            <Entity type="Sculptor" name={sculptor.name} path={`/sculptor/${sculptor.id}`} />
          </div>

          <Spacer spacing={2} />


          <div style={styles.listWrapper}>
            {/* @ts-ignore */}
            <div style={styles.list}>
              {images.map((i: any, index: number) => {
                return (
                  <div key={`${Math.random()}-images-nendoroids`} style={{ height: "100%", minWidth: "19vw", padding: "1rem" }}>
                    <img
                      onClick={() => setOPreview([true, index])}
                      style={{ height: "100%", width: "100%", objectFit: "cover" }}
                      src={i} alt={formattedName}
                    />
                  </div>
                )
              })}
            </div>
          </div>
          {/* @ts-ignore */}
          <Preview src={images[oPreview[1]]} isOpen={oPreview[0]} onClose={() => setOPreview([false, 0])} />

          <Spacer spacing={3} />

          <RelatedProduct nendoroids={series.nendoroids} />



          <div >
            {data.nendoroid.interactions.map(({ user: { username } }: any) => <Typography text={username} type="h3" />)}
          </div>

        </div>

      </Layout>
    );
  }
  return <></>
}

export default Nendoroid;
