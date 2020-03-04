import React, { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Loader from "../components/Loader";
import { useHistory } from "react-router-dom";
import Header from "../components/Header";
import Spacer from "../components/Spacer";
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

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
    nendoroids(where: {series : $chu}, sort: "number") {
      ...Core
      interactions(where:{user:{id: $id}}) {
        id
      }
    }
  }
`;

function InteractionsButton({ nendoId, isLiked = false, interactionId = null }) {

  const CREATE_INTERACTION = gql`
    mutation CreateInteraction($type: ENUM_INTERACTION_TYPE, $user: ID!, $nendoroid: ID!) {
      createInteraction(
        input: { data: { type: $type, user: $user, nendoroid: $nendoroid } }
      ) {
        interaction {
          id
        }
      }
    }
  `;

  const DELETE_INTERACTION = gql`
    mutation DeleteInteraction($id: ID!){
      deleteInteraction(input: { where: { id: $id } }) {
        interaction {
          id
        }
      }
    }
  `;

  const [liked, setLiked] = useState(isLiked)
  const [createInteraction] = useMutation(CREATE_INTERACTION);
  const [deleteInteraction] = useMutation(DELETE_INTERACTION);
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
    deleteInteraction({ variables: { id: interactionId } })
  }

  const addLike = (e, bool) => {
    e.stopPropagation();
    setLiked(bool);
    createInteraction({ variables: { type: "LIKE", nendoroid: nendoId, user: localStorage.getItem("myId") } });
  }
  return (
    <>
      {
        liked
          ? <IoIosHeart style={styles.root} onClick={(e) => removeLike(e, false)} color="red" size="2rem" />
          : <IoIosHeartEmpty style={styles.root} onClick={(e) => addLike(e, true)} color="red" size="2rem" />
      }
    </>
  )
}

export function Card({ id, image, formattedName, path, interactions }) {
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const styles = {
    root: {
      zIndex: 1,
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
      flexDirection: "column",
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
      flexDirection: "column",

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
      <InteractionsButton nendoId={id} isLiked={interactions.length > 0} interactionId={interactions.length > 0 && interactions[0].id} />
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
    variables: { chu: filter, id: localStorage.getItem("myId") }
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
          {data.nendoroids.map(({ id, formattedName, images, interactions }) => <Card id={id} interactions={interactions} formattedName={formattedName} image={images} path={`/nendoroid/${id}`} fill />)}
        </div>
      </div>
    );
  }
}

export default Nendoroids;
