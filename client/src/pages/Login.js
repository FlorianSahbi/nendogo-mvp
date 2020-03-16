import React from "react";
import { useMutation } from "@apollo/client";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../graphql/authentication";
import FacebookLogin from "react-facebook-login";

let users = [
  {
    name: "Yulric",
    graphDomain: null,
    picture: null,
    accessToken: null,
    email: null,
  },
  {
    name: "Sonson",
    graphDomain: null,
    picture: null,
    accessToken: null,
    email: "florian.sahbi@gmail.com",
  },
]

function Login() {
  console.log(("Login"))
  const history = useHistory();

  const [login] = useMutation(LOGIN, {
    onCompleted: data => {
      localStorage.setItem("nendogo_jwt", data.login.jwt);
      localStorage.setItem("nendogo_user_id", data.login.user.id);
      history.push("/");
    },
  });

  const isFacebookUser = (emailCurrent) => {
    const userDb = users.find(user => user.email === emailCurrent);
    if (userDb) {
      return !!userDb.graphDomain;
    } else {
      return false;
    }
  }

  const responseFacebook = (response) => {
    console.log(response);
    const { accessToken, name, graphDomain, email, picture: { data: { url } } } = response;
    if (isFacebookUser(email)) {
      console.log("existe deja ddonc login")
    }
    if (!isFacebookUser(email)) {
      console.log("existe pas donc register")
      const newUser = { accessToken, name, graphDomain, email, url };
      users = [...users, newUser];
      localStorage.setItem("nendogo_picture", url);
      localStorage.setItem("nendogo_name", name);
      history.push("/")
      console.log(users)
    }
  }

  const { register, handleSubmit } = useForm();
  const onSubmit = data => login({ variables: { identifier: data.email, password: data.password } });

  return (
    <>
      <FacebookLogin
        appId="267253924584068"
        autoLoad={false}
        fields="name,email,picture.height(1000).width(1000)"
        onClick={() => console.log("ok")}
        callback={responseFacebook}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="email" ref={register({ required: true })} />
        <input name="password" ref={register({ required: true })} />
        <input type="submit" />
      </form>
    </>
  )
}

export default Login;
