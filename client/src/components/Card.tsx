import React, { useState, ReactElement } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Typography from "../components/Typography";
import { Palette } from "./Layout";
import { Theme, Auth } from "../App";
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { CREATE_INTERACTION, DELETE_INTERACTION } from "../graphql/interaction";

interface foregroundProps {
  name: string;
  number: number;
  isActive: boolean;
}

interface imageProps {
  src: string;
  alt: string;
}

function LikeInteraction({ isLiked, idNendo, likeId }: any) {
  const [createInteraction] = useMutation(CREATE_INTERACTION);
  const [deleteInteraction] = useMutation(DELETE_INTERACTION);
  const auth = Auth.useContainer();


  const styles = {
    root: {
      height: "50px",
      width: "50px",
      position: "absolute",
      zIndex: "999",
      top: "0",
      right: "0",
      margin: "0.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // border: "2px solid blue",
    }
  }

  const handleLike = (e: any) => {
    e.stopPropagation();
    if (!isLiked && auth.credentials) {
      createInteraction({ variables: { user: auth.credentials.login.user.id, nendoroid: idNendo, type: "LIKE" } })
    } else if (isLiked && auth.credentials) {
      console.log(likeId[0])
      deleteInteraction({ variables: { id: likeId || likeId[0] } })
    } else {
      console.log("open modal")
    }
  }

  return (
    //@ts-ignore
    <div style={styles.root} onClick={(e) => handleLike(e)}>
      {isLiked
        ? <FaHeart size="2rem" color="red" />
        : <FaRegHeart size="2rem" color="red" />
      }
    </div>
  )
}

const Image = ({ src, alt }: imageProps): ReactElement => {
  const styles = {
    root: {
      position: "relative",
      height: "100%",
      width: "100%",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
    },
  };
  return (
    // @ts-ignore
    <div style={styles.root}>
      {/* @ts-ignore */}
      <img style={styles.image} src={src} alt={alt} />
    </div>
  )
}

const Foreground = ({ name, number, isActive = false }: foregroundProps): ReactElement => {
  const theme = Theme.useContainer();
  const styles = {
    default: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].transparent,
      transition: "opacity 0.2s ease",
      zIndex: "1",
      opacity: "0",
    },
    active: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      position: "absolute",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].transparent,
      transition: "opacity 0.2s ease",
      backdropFilter: "blur(5px)",
      zIndex: "1",
      opacity: "1",
    },
  };
  return (
    // @ts-ignore
    <div style={isActive ? styles.active : styles.default}>
      <Typography text={name} type="h3" textAlign="center" />
      <Typography text={number} type="body1" textAlign="center" />
    </div>
  )
}

function Card({ id, images, formattedName, path, number, loading, isLiked, likeId }: any): ReactElement {
  const theme = Theme.useContainer();
  const history = useHistory();
  const [isActive, setIsActive] = useState(false);
  const styles = {
    root: {
      zIndex: 1,
      cursor: "pointer",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation1,
      position: "relative",
      overflow: "hidden",
    },
    loading: {
      zIndex: 1,
      cursor: "pointer",
      height: "100%",
      width: "100%",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation1,
      position: "relative",
      overflow: "hidden",
    },
  }
  if (loading) {
    return (
      // @ts-ignore
      <div style={styles.loading} />
    )
  } else {
    return (
      <div
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onClick={() => history.push(path)}
        // @ts-ignore
        style={styles.root}
      >
        <LikeInteraction idNendo={id} isLiked={isLiked} likeId={likeId} />
        <Foreground name={formattedName} number={number} isActive={isActive} />
        <Image src={images[0]} alt={`${id}-card`} />
      </div>
    )
  }
}

export default Card;
