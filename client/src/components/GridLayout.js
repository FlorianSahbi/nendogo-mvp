import React from "react";

function GridLayout({ itemsPerRow, rowHeight, width, children }) {
  const styles = {
    root: {
      display: "grid",
      gridAutoRows: `${rowHeight}px`,
      gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
      gridGap: "10px",
      width: width ? `${width}px` : "100%",
      height: "100%",
      justifyItems: "center",
      alignItems: "center",
    }
  }

  return (
    <div style={styles.root}>
      {children}
    </div>
  )
}

export default GridLayout;