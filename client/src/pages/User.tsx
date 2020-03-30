import React, { ReactElement } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { GET_USER, GET_ME } from "../graphql/user";
import { Palette } from "../components/Layout";
import { Theme } from "../App";

function User(): ReactElement {
  const theme = Theme.useContainer();
  console.log(("User"))
  const params = useParams();
  // @ts-ignore
  const userId = params.id;
  // @ts-ignore
  const { data, loading, error } = useQuery(userId === "me" ? GET_ME : GET_USER, { variables: { id: params.id } });
  const styles = {
    root: {
      width: "100vw",
      minHeight: "100vh",
      // @ts-ignore
      backgroundColor: Palette[theme.theme].elevation0,
    },
  }
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <p>{error.message}</p>
  }
  if (data.me) {
    return (
      <div style={styles.root}>
        <div>
          {/* {data.user.profilePicture || data.me.profilePicture &&
            <Image src={`http://localhost:1337${data.user.profilePicture.url}`} alt="profil" round size={227} />
          } */}

          <Button label={data.me.username} />
        </div>
      </div>
    );
  }


  if (data.user) {
    return (
      <div style={styles.root}>
        <div>
          {/* {data.user.profilePicture || data.me.profilePicture &&
            <Image src={`http://localhost:1337${data.user.profilePicture.url}`} alt="profil" round size={227} />
          } */}
          <div style={{ display: 'grid', gridTemplateColumns: "repeat(5, 1fr)" }}>

            {data.user.interactions.map(({ nendoroid: { id, formattedName, images } }: any) => <Card key={id} interactions={[]} id={id} formattedName={formattedName} images={images} path={`nendoroid/${id}`} />)}
          </div>

          <Button label={data.user.username || data.me.username} />
        </div>
      </div>
    );
  }

  return <></>;
}

export default User;
