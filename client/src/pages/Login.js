import React from "react";
import { useMutation } from "@apollo/client";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../graphql/authentication";
import FacebookLogin from "react-facebook-login";
import Layout from "../components/Layout";
import logo from "../logo.svg";

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

let inputsStyle = {
  text: {
    height: "40px",
    width: "100%",
    padding: "1rem",
    border: "1px solid grey",
    outline: "unset",
  },
  submit: {
    height: "40px",
    width: "100%",
    padding: "1rem",
    border: "1px solid grey",
    outline: "unset",
    background: "#fff"
  }
}


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
    <Layout header={false} footer={false}>
      <div style={{ display: "grid", backgroundColor: "#121212", gridTemplateColumns: "1fr 1fr", height: "100vh", width: "100%" }}>
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={logo} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <form style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: ".5rem" }} onSubmit={handleSubmit(onSubmit)}>
            <input style={inputsStyle.text} name="email" ref={register({ required: true })} />
            <input style={inputsStyle.text} name="password" ref={register({ required: true })} />
            <input style={inputsStyle.submit} type="submit" />
          </form>
          <FacebookLogin
            appId="267253924584068"
            autoLoad={false}
            fields="name,email,picture.height(1000).width(1000)"
            onClick={() => console.log("ok")}
            callback={responseFacebook}
            style={{ border: "2px solid pink" }}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Login;
