import React, { ReactElement } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../graphql/authentication";
import Layout from "../components/Layout";
import logo from "../logo.svg";
import Typography from "../components/Typography";
import { Palette } from "../components/Layout";
import { Theme, Auth } from "../App";
import { REGISTER } from "../graphql/authentication";

function Login(): ReactElement {
  const theme = Theme.useContainer();
  const auth = Auth.useContainer();

  console.log(("Login"))
  const history = useHistory();

  const [loginMutation] = useMutation(LOGIN, {
    onCompleted: data => {
      auth.setCredentials(data);
      localStorage.setItem("credentials_nendogo", JSON.stringify(data));
      history.replace(`user/${data.login.user.id}`)
    },
    onError: error => {
      console.log(error)
    }
  });

  const [registerMutation] = useMutation(REGISTER, {
    onCompleted: (data) => {
      auth.setCredentials(data);
      localStorage.setItem("credentials_nendogo", JSON.stringify(data));
      history.replace(`user/${data.register.user.id}`)
    },
    onError: error => {
      console.log(error)
    }
  });

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
      cursor: "pointer",
      border: "1px solid grey",
      outline: "unset",
      // @ts-ignore
      background: Palette[theme.theme].elevation1,
    }
  }


  const { register:test, handleSubmit:hs } = useForm();
  const { register, handleSubmit } = useForm();
  const onLogin = (data: any) => loginMutation({ variables: { identifier: data.username, password: data.password } });
  const onSubmit = (data: any) => registerMutation({ variables: { username: data.username, email: data.email, password: data.password } });

  return (
    <Layout header={false} footer={false}>
      <div style={{
        display: "grid",
        // @ts-ignore
        backgroundColor: Palette[theme.theme].elevation0, gridTemplateColumns: "1fr 1fr", height: "100vh", width: "100%"
      }}>
        <div style={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <img src={logo} alt="logo-site" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          {/* @ts-ignore */}
          <form style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: ".5rem" }} onSubmit={handleSubmit(onSubmit)}>
            <input style={inputsStyle.text} placeholder="Username" type="text" name="username" ref={register({ required: true })} />
            <input style={inputsStyle.text} placeholder="Email" type="email" name="email" ref={register({ required: true })} />
            <input style={inputsStyle.text} placeholder="Password" type="password" name="password" ref={register({ required: true })} />
            <input style={inputsStyle.submit} type="submit" />
          </form>
        </div>
        <Typography text="Login" type="h3" />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          {/* @ts-ignore */}
          <form style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr", gap: ".5rem" }} onSubmit={hs(onLogin)}>
            <input style={inputsStyle.text} placeholder="Username" type="text" name="username" ref={test({ required: true })} />
            <input style={inputsStyle.text} placeholder="Password" type="password" name="password" ref={test({ required: true })} />
            <input style={inputsStyle.submit} type="submit" />
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login;
