import React, { useState } from "react";
import { useQuery, gql, useMutation, useApolloClient } from "@apollo/client";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";


const IS_LOGGED_ID = gql`
    query userIsLoggedIn {
      isLoggedIn @client
    }
`;

const GET_MY_ID = gql`
    query MyId {
      myId @client
    }
`;

const GET_IMAGES = gql`
    query {
      nendoroids(limit:100) {
      images
    }
  }
`;

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Foreground = () => {
  const styles = {
    root: {
      height: "100vh",
      width: '100vw',
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 9,
    }
  }
  return (
    <div style={styles.root}>

    </div>
  )
}



function shuffle(array) {
  const arrayNew = [...array];

  for (let i = arrayNew.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = arrayNew[i]
    arrayNew[i] = arrayNew[j]
    arrayNew[j] = temp
  }
  return arrayNew;
}

const Background = () => {
  let imagesArray = [];
  const { data, error, loading } = useQuery(GET_IMAGES);
  if (error) {
    return <div>{error.message}</div>
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (data) {
    data.nendoroids.map(({ images }) => {
      imagesArray = [...imagesArray, ...images];
    });
    return (
      shuffle(imagesArray).map(image => {
        return (
          <div style={{ width: "100%" }}>
            <img style={{ height: "100%", width: "100%", objectFit: "contain", marginBottom: "-5px" }} src={image} alt="ko" />
          </div>
        )
      })
    )
  }
}

function Login() {
  console.log(("Login"))
  const history = useHistory();
  const client = useApolloClient();



  const LOGIN = gql`
    mutation Login($identifier: String! $password: String!) {
        login(
          input: { identifier: $identifier, password: $password }
        ) {
          jwt
      
          user {
            id
            email
            username
          }
        }
      }
  `;
  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      localStorage.setItem("nendogo", data.login.jwt);
      localStorage.setItem("myId", data.login.user.id);
      client.writeQuery({
        query: IS_LOGGED_ID,
        data: { isLoggedIn: true }
      })
      client.writeQuery({
        query: GET_MY_ID,
        data: { myId: data.login.user.id }
      })
      history.push("/");
    },
  });

  const { register, handleSubmit } = useForm();
  const onSubmit = data => login({ variables: { identifier: data.email, password: data.password } });

  // watch input value by passing the name of it

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative", background: "#121212", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ height: "500px", width: "400px", position: "absolute", zIndex: 10, background: "#121212", padding: "1rem" }}>
        <div style={{ border: "2px solid white", height: "500px", width: "400px", position: "absolute", zIndex: 10, background: "#121212", }}>


          <form onSubmit={handleSubmit(onSubmit)}>
            <input name="email" ref={register({ required: true })} />
            <input name="password" ref={register({ required: true })} />
            <input type="submit" />
          </form>

        </div>



      </div>
      <Foreground />
      <div style={{ display: "flex", position: "relative" }} className="anim">
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
        <div style={{ display: "grid", gridTemplateRows: "repeat(5, 1fr)", gridAutoFlow: "dense", minHeight: "100vh", }}>
          <Background />
        </div>
      </div>
    </div>
  )
}

export default Login;