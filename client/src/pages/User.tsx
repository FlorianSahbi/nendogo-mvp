import React, { ReactElement } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Loader from "../components/Loader";
import Card from "../components/Card";
import { useForm } from "react-hook-form";
import { GET_USER, GET_ME, UPDATE_USER } from "../graphql/user";
import { Palette } from "../components/Layout";
import { Theme } from "../App";


const Edit = () => {
  const params = useParams();
  // @ts-ignore
  const userId = params.id;
  const [editMutation] = useMutation(UPDATE_USER, {
    onError: error => console.log(error),
    onCompleted: data => console.log(data)
  });
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => editMutation({ variables: { id: userId, email: data.email, password: data.password } });

  return (
    //@ts-ignore
    <form style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: ".5rem" }} onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Username" type="text" name="username" ref={register({ required: true })} />
      <input placeholder="Email" type="email" name="email" ref={register({ required: true })} />
      <input type="submit" />
    </form>
  )
}

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
          <Edit />
          {/* {data.user.profilePicture || data.me.profilePicture &&
            <Image src={`http://localhost:1337${data.user.profilePicture.url}`} alt="profil" round size={227} />
          } */}
          <Button label={data.user.username || data.me.username} />
        </div>
      </div>
    );
  }

  return <></>;
}

export default User;
