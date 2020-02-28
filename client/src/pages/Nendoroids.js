import React, { Fragment, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Spacer from "../components/Spacer";

const GET_SERIES = gql`
  query {
    series {
      name
    }
  }
`;

const GET_NENDOROIDS = gql`

  fragment Core on Nendoroid {
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

  # fragment Description on Nendoroid {
  #   title
  #   description
  # }

  # fragment Other on Nendoroid {
  #   releasedBy
  #   planningProduction
  #   distributedBy
  #   specifications
  #   cooperation
  #   name
  #   category
  #   srcUrl
  # }

  # fragment Interactions on Nendoroid {
  #   interactions {
  #     id
  #     type
  #     users {
  #       id
  #       username
  #       profilePicture {
  #         url
  #       }
  #     }
  #   }
  # }

  # fragment Serie on Nendoroid {
  #   serie {
  #     id
  #     name
  #   }
  # }

  query GetNendoroids($chu: String) {
    nendoroids(where: {series : $chu}, sort: "formattedName") {
      ...Core 
    }
  }
`;

function InteractionsButton(nendoId, type) {
  return(
    <div>

    </div>
  )
}

export function Card({ image, formattedName, path }) {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const styles = {
    root: {
      cursor: "pointer",
      height: "100%",
      width: "100%",
      padding: "10px",
      backgroundColor: "#1F1F1F",
      position: "relative",
      overflow: "hidden",
    },
    imgWrapper: {
      position: "relative",
      height: "100%",
      width: "100%",
      border: "3px solid grey",
    },
    img: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
    foreground: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      top: "120%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      transition: "all 0.2s ease",

      textAlign: "center",
      color: "white",
    },
    foregroundHover: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      top: "0%",
      backgroundColor: "rgba(0, 0, 0, .5)",
      transition: "all 0.2s ease",

      textAlign: "center",
      color: "white",
    },
  }
  return (
    <div onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)} onClick={() => history.push(path)} style={styles.root}>
      <div style={styles.imgWrapper}>
        <div style={isActive ? styles.foregroundHover : styles.foreground}>
          {formattedName}
        </div>
        <img style={styles.img} src={image[0]} />
      </div>
    </div>
  )
}

function Filters({ onFilter }) {
  const [value, setValue] = useState(null);
  const { data, loading, error } = useQuery(GET_SERIES)

  const handleFilter = (event) => {
    setValue(event.target.value);
    onFilter(event.target.value);
  }

  if (loading) {
    return (
      <div>Loadind...</div>
    )
  }
  if (error) {
    return (
      <div>{error.message}</div>
    )
  }
  if (data) {
    return (
      <div>
        <select value={value} onChange={(event) => handleFilter(event)}>
          {data.series.map(({ id, name }) => <option value={id}>{name}</option>)}
        </select>
      </div>
    )
  }
}

function Nendoroids() {
  const [filter, setFilter] = useState("Naruto Shippuden");
  const { data, loading, error } = useQuery(GET_NENDOROIDS, {
    variables: { chu: filter }
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
    return <p>{error.message}</p>
  }
  if (data) {
    return (
      <div style={styles.root}>
        <Header />
        <Spacer spacing={3} />
        <Filters onFilter={(filter) => setFilter(filter)} />
        <Spacer spacing={1} />
        <div style={styles.list}>
          {data.nendoroids.map(({ id, formattedName, images }) => <Card formattedName={formattedName} image={images} path={`/nendoroid/${id}`} fill />)}
        </div>
      </div>
    );
  }
}

export default Nendoroids;
