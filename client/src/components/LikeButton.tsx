import React, { ReactElement, useState, MouseEvent } from "react";
import { IoIosHeartEmpty, IoIosHeart } from 'react-icons/io';

function LikeButton({ isLiked = false }: any): ReactElement {
  const [liked, setLiked] = useState<boolean>(isLiked)
  const styles = {
    root: {
      position: "absolute",
      top: 0,
      right: 0,
      margin: "1rem",
      zIndex: 9999,
    }
  }

  const removeLike = (e: MouseEvent, bool: boolean) => {
    e.stopPropagation();
    setLiked(bool);
  }

  const addLike = (e: MouseEvent, bool: boolean) => {
    e.stopPropagation();
    setLiked(bool);
  }
  return (
    <>
      {
        isLiked
          ?
          (
            <IoIosHeart
              // @ts-ignore
              style={styles.root}
              onClick={(e) => removeLike(e, false)}
              color="red"
              size="2rem"
            />
          )
          : (
            <IoIosHeartEmpty
              // @ts-ignore
              style={styles.root}
              onClick={(e) => addLike(e, true)}
              color="red"
              size="2rem"
            />
          )
      }
    </>
  )
}

export default LikeButton;
