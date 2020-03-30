import React, { ReactElement } from "react";
import { Palette } from "../components/Layout";
import { Theme } from "../App";

const Typography = ({ text, type, textAlign }: any): ReactElement => {
  const theme = Theme.useContainer();
  const styles = {
    h3: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "24px",
      lineHeight: "28px",
      // @ts-ignore
      color: Palette[theme.theme].text.primary,
      textAlign: textAlign
    },
    body1: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "1.5rem",
      // @ts-ignore
      color: Palette[theme.theme].text.primary,
      textAlign: textAlign
    },
    titleNendo: {
      fontFamily: "Sawarabi Mincho",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "5rem",
      lineHeight: "5rem",// @ts-ignore
      color: Palette[theme.theme].text.primary,
      textAlign: textAlign
    },
  }

  return (
    // @ts-ignore
    <p style={styles[type]}>
      {text}
    </p>
  )
}

export default Typography;