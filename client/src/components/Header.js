import React from "react";
import logo from '../logo.svg';
import Spacer from "./Spacer";
import Image from "./Image";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import { useApolloClient, gql } from "@apollo/client";
import Typography from "../components/Typography";

const IS_LOGGED_ID = gql`
    query userIsLoggedIn {
      isLoggedIn
    }
`;

function LoginButton() {
  const history = useHistory();
  const handleLogout = () => {
    history.push("/login");
  }
  return (
    <div onClick={handleLogout}>
      <Typography text="Login" type="body1" />
    </div>
  )
}

function LogoutButton() {
  const client = useApolloClient();
  const handleLogout = () => {
    client.writeQuery({
      query: IS_LOGGED_ID,
      data: { isLoggedIn: false }
    })
    localStorage.clear();
  }
  return (
    <div onClick={handleLogout}>
      <Typography text="Logout" type="body1" />
    </div>
  )
}

function Header() {
  const history = useHistory();
  const styles = {
    profile: {
      display: "flex",
      justifyContent: "center",
    },
    buttons: {
      display: "flex",
      justifyContent: "space-between",
      width: "1280px",
    },
    logo: {
      display: "flex",
      justifyContent: "center",
    },
    buttonsWrapper: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
    }
  }

  const buttons = [
    { label: "Nendoroids", path: "nendoroids" },
    { label: "Series", path: "/series" },
    { label: "Manufacturers", path: "manufacturers" },
    { label: "Sculptors", path: "sculptors" },
    { label: "Users", path: "users" },
  ];

  return (
    <div style={{backgroundColor: "#121212", borderBottom: "2px solid #DF0001",}}>
      <div style={styles.logo}>
        <img onClick={() => history.push("/")} src={logo} alt="title" />
      </div>
      <Spacer spacing={5} />

      {localStorage.getItem("nendogo")
        ?
        (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={styles.profile} onClick={() => history.push("user/me")}>
              <Image src="https://img.8wallpapers.com/uploads/2019/01/1f8ace94122643ad9b5808ec-1000x625.jpg" alt="profil" round size={227} />
            </div>
            <LogoutButton />
          </div>
        )
        :
        (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
            <div style={styles.profile}>
              <Image src="https://www.kindpng.com/picc/m/91-916157_anime-girl-face-png-anime-girl-face-transparent.png" alt="profil" round size={227} />
            </div>
            <LoginButton />
          </div>
        )
      }


      <Spacer spacing={5} />

      <div style={styles.buttonsWrapper}>
        <div style={styles.buttons}>
          {buttons.map(({ label, path }) => <Button onHoverButton={() => { }} label={label} path={path} />)}
        </div>
      </div>
      <Spacer spacing={5} />
    </div>
  )
}

export default Header;
