import React from "react";

const Spacer = ({ spacing, direction = "vertical" }) => {
  const styles = {
    root: {
      margin: direction === "vertical" ? `${spacing}rem 0rem` : `0rem ${spacing}rem`,
    }
  }
  return (
    <div style={styles.root} />
  )
}

export default Spacer;