import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Serie from "./pages/Serie.js";
import Nendoroid from "./pages/Nendoroid.js";
import Series from "./pages/Series.js";
import Sculptors from "./pages/Sculptors.js";
import Manufacturers from "./pages/Manufacturers.js";
import Nendoroids from "./pages/Nendoroids.js";
import Manufacturer from "./pages/Manufacturer.js";
import User from "./pages/User.js";
import Users from "./pages/Users.js";
import Sculptor from "./pages/Sculptor.js";
import Login from "./pages/Login.js";
import Modal from "./components/Modal";
import { createContainer } from "unstated-next"

function useTheme(initialState = "dark") {
  const [theme, setTheme] = useState(initialState);
  const switchLight = () => {setTheme("light"); localStorage.setItem("nendogo_theme", "light")}
  const switchDark = () => {setTheme("dark"); localStorage.setItem("nendogo_theme", "dark")}
  return { theme, switchLight, switchDark };
}

export const Theme = createContainer(useTheme)

export default function App() {
  console.log("App")
  const theme = localStorage.getItem("nendogo_theme");
  return (
    <Theme.Provider initialState={theme || "dark"}>
      <Modal isOpen={!!localStorage.getItem("authenticationModal")} />
      <Router>

        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/nendoroids">
            <Nendoroids />
          </Route>

          <Route path="/series">
            <Series />
          </Route>

          <Route path="/manufacturers">
            <Manufacturers />
          </Route>

          <Route path="/sculptors">
            <Sculptors />
          </Route>

          <Route path="/users">
            <Users />
          </Route>

          <Route path="/user/:id">
            <User />
          </Route>

          <Route path="/nendoroid/:id">
            <Nendoroid />
          </Route>

          <Route path="/serie/:id">
            <Serie />
          </Route>

          <Route path="/manufacturer/:manufacturerName">
            <Manufacturer />
          </Route>

          <Route path="/sculptor/:sculptorName">
            <Sculptor />
          </Route>

          <Route path="/">
            <Home />
          </Route>

        </Switch>
      </Router>
    </Theme.Provider>
  );
}