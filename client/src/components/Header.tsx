import React, { ReactElement } from "react";
import logo from '../logo.svg';
import Spacer from "./Spacer";
import Image from "./Image";
import Button from "./Button";
import { useHistory } from "react-router-dom";
import Typography from "../components/Typography";
import { Palette } from "./Layout";
import { Theme, Auth } from "../App";

function LoginButton(): ReactElement {
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

function LogoutButton(): ReactElement {
  const auth = Auth.useContainer();
  const handleLogout = () => {
    auth.setCredentials(null);
    localStorage.removeItem("credentials_nendogo");
  }
  return (
    <div onClick={handleLogout}>
      <Typography text="Logout" type="body1" />
    </div>
  )
}

function Header(): ReactElement {
  const theme = Theme.useContainer();
  const auth = Auth.useContainer();
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
    // @ts-ignore
    <div style={{ borderBottom: `2px solid ${Palette[theme.theme].secondary}`, }}>
      <div style={styles.logo}>
        <img onClick={() => history.push("/")} src={logo} alt="title" />
      </div>
      <Spacer spacing={5} />

      {auth.credentials
        ?
        (
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={styles.profile} onClick={() => history.push(`user/${auth.credentials.login.user.id}`)}>
              <Image src="https://www.nautiljon.com/images/perso/00/05/nanachi_15450.jpg" alt="profil" round size={227} />
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
      {/* @ts-ignore  */}
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
