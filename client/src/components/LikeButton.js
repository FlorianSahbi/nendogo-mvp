import React from "react";
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

function LikeButton({ isLiked = false }) {
  const [liked, setLiked] = useState(isLiked)
  const styles = {
    root: {
      position: "absolute",
      top: 0,
      right: 0,
      margin: "1rem",
      zIndex: 9999,
    }
  }

  const removeLike = (e, bool) => {
    e.stopPropagation();
    setLiked(bool);
  }

  const addLike = (e, bool) => {
    e.stopPropagation();
    setLiked(bool);
  }
  return (
    <>
      {
        isLiked
          ? <IoIosHeart style={styles.root} onClick={(e) => removeLike(e, false)} color="red" size="2rem" />
          : <IoIosHeartEmpty style={styles.root} onClick={(e) => addLike(e, true)} color="red" size="2rem" />
      }
    </>
  )
}

export default LikeButton;
