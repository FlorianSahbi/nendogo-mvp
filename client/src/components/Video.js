import React from "react";
import video1 from "../assets/video/reKill.mp4"

const Foreground = () => {
  const styles = {
    root: {
      height: "100%",
      width: "100%",
      position: "absolute",
      zIdenx: 9,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("https://www.transparenttextures.com/patterns/45-degree-fabric-light.png")',
      backgroundRepeat: "repeat",
    },
    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
    }
  }

  return (
    <div style={styles.root}>
    </div>
  )
}

function Video() {
  const styles = {
    root: {
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      position: "relative",
    },
    wrapperVideo: {
      minHeight: "100vh",
      width: "100%",
      opacity: 0.5,
    },
  }
  return (
    <div style={styles.root}>
      <Foreground />
      <video style={styles.wrapperVideo} id="background-video" loop autoPlay>
        <source src={video1} type="video/mp4" />
      </video>
    </div>
  )
}

export default Video;
