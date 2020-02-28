import React from "react";
import Typography from "../components/Typography";
import Spacer from "../components/Spacer";

function FeaturedImage() {
  const styles = {
    root: {
      width: "1280px",
      height: "720px",
      minWidth: "1280px",
      minHeight: "720px",
      backgroundColor: "#202020",
      padding: "1rem",
    },
    wrapper: {
      border: "2px solid #D9D9D9",
      width: "100%",
      height: "100%",
    },
    imgWrapper: {
      height: "100%",
      width: "100%",
    },
    img: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
    }
  }
  return (
    <>
      <Typography text="Featured this month" type="h3" />
      <Spacer spacing={1} />
      <div style={styles.root}>
        <div style={styles.wrapper}>
          <div style={styles.imgWrapper}>
            <img style={styles.img} src="https://c.wallhere.com/photos/04/f2/kantai_collection_kancolle_nendoroid_426_kaga-682286.jpg!d" alt="feat" />
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturedImage