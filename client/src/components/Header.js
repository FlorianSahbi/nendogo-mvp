import React from "react";
import logo from '../logo.svg';
import Spacer from "./Spacer";
import Image from "./Image";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import Typography from "../components/Typography";
import { Palette } from "./Layout";
import { Theme } from "../App";

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
  const handleLogout = () => {
    localStorage.clear();
  }
  return (
    <div onClick={handleLogout}>
      <Typography text="Logout" type="body1" />
    </div>
  )
}

function Header() {
  const theme = Theme.useContainer();
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
    { id: 0, label: "Nendoroids", path: "/nendoroids" },
    { id: 1, label: "Series", path: "/series" },
    { id: 2, label: "Manufacturers", path: "/manufacturers" },
    { id: 3, label: "Sculptors", path: "/sculptors" },
    { id: 4, label: "Users", path: "/users" },
  ];

  return (
    <div style={{ borderBottom: `2px solid ${Palette[theme.theme].secondary}`, }}>
      <div style={styles.logo}>
        <img onClick={() => history.push("/")} src={logo} alt="title" />
      </div>
      <Spacer spacing={5} />

      {localStorage.getItem("nendogo_picture")
        ?
        (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={styles.profile} onClick={() => history.push("user/me")}>
              <Image src={localStorage.getItem("nendogo_picture")} alt="profil" round size={227} />
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
          {buttons.map(({ id, label, path }) => <Button key={`${id}-${label}-menu`} label={label} path={path} />)}
        </div>
      </div>
      <Spacer spacing={5} />
    </div>
  )
}

export default Header;
