import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Image from "../components/Image";
import Loader from "../components/Loader";
import { Card } from "../pages/Nendoroids";

const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      profilePicture {
        url
      }
      interactions {
        nendoroid {
          images
          formattedName
          id
        }
      }
    }
  }
`;

const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      username
    }
  }
`;

function User() {
  console.log(("User"))
  const params = useParams();
  const userId = params.id;

  const { data, loading, error } = useQuery(userId === "me" ? GET_ME : GET_USER, { variables: { id: params.id } });
  const styles = {
    root: {
      width: "100vw",
      minHeight: "100vh",
      backgroundColor: "#121212",
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

          <Button onHoverButton={() => { }} label={data.me.username} />
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

            {data.user.interactions.map(({ nendoroid: { id, formattedName, images } }) => <Card interactions={[]} id={id} formattedName={formattedName} image={images} path={`nendoroid/${id}`} />)}
          </div>

          <Button onHoverButton={() => { }} label={data.user.username || data.me.username} />
        </div>
      </div>
    );
  }
}

export default User;
