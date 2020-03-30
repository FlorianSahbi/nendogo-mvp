import React, { ReactElement } from "react";
import { MdClose } from 'react-icons/md';
import { Palette } from "./Layout";
import { Theme } from "../App";

function Modal({ isOpen }: any): ReactElement {
  const theme = Theme.useContainer();

  const onClose = () => {

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
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation0,
      position: "relative",
    },
    cross: {

    }
  }
  if (isOpen) {
    return (
      // @ts-ignore
      <div style={styles.root}>
        {/* @ts-ignore */}
        <div style={styles.background} onClick={onClose} />
        {/* @ts-ignore */}
        <div style={styles.modal}>
          <MdClose onClick={onClose} color="red" size="2rem" style={styles.cross} />
        </div>
      </div>
    )
  }
  return <></>
}

export default Modal;