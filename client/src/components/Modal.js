import React from "react";
import { MdClose } from 'react-icons/md';
import { useApolloClient, gql } from "@apollo/client";
import { Palette } from "./Layout";
import { Theme } from "../App";

const AUTHENTICATE_MODAL = gql`
  query authenticateModal {
    authenticationModal @client
  }
`;

function Modal({ isOpen }) {
  const theme = Theme.useContainer();
  const client = useApolloClient();
  const onClose = () => {
    client.writeQuery({
      query: AUTHENTICATE_MODAL,
      data: {
        authenticationModal: false,
      }
    });
  }
  const styles = {
    root: {
      position: "fixed",
      zIndex: 900,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    background: {
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.7)",
      height: "100%",
      width: "100%",
    },
    modal: {
      height: "500px",
      width: "500px",
      backgroundColor: Palette[theme.theme].elevation0,
      position: "relative",
    },
    cross: {

    }
  }
  if (isOpen) {
    return (
      <div style={styles.root}>
        <div style={styles.background} onClick={onClose} />
        <div style={styles.modal}>
          <MdClose onClick={onClose} color="red" size="2rem" style={styles.cross} />
        </div>
      </div>
    )
  }
  return <></>
}

export default Modal;