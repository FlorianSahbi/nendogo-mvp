import React, { ReactElement } from "react";
import { Palette } from "./Layout";
import { Theme } from "../App";

const Image = ({ src, alt, round = false, size }: any): ReactElement => {
  const theme = Theme.useContainer();
  const styles = {
    root: {
      height: round ? `${size}px` : "100%",
      width: round ? `${size}px` : "100%",
      borderRadius: round ? "50%" : "",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation1,
      // @ts-ignore
      border: `5px solid ${Palette[theme.theme].secondary}`,
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      borderRadius: round ? "50%" : "",
    }
  }

  return (
    <div style={styles.root}>
      {/* @ts-ignore */}
      <img style={styles.image} src={src} alt={alt} />
    </div>
  )
}

export default Image;