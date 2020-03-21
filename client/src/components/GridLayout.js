import React from "react";

function GridLayout({ itemsPerRow, rowHeight, width, children, debug, gap = 10 }) {
  const styles = {
    root: {
      display: "grid",
      gridAutoRows: `${rowHeight}px`,
      gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
      gridGap: `${gap}px`,
      padding: `${gap}px`,
      width: width ? `${width}px` : "100%",
      height: "100%",
      justifyItems: "center",
      alignItems: "center",
      border: debug ? "5px solid purple" : ""
    }
  }

  return (
    <div style={styles.root}>
      {children}
    </div>
  )
}

export default GridLayout;