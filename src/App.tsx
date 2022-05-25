import React, { useEffect, FC, ReactElement, useState } from "react";


import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import Layout from "./components/Layout";
import "./index.css"
import AuthService from "./services/auth.service";
import IUser from './types/user.type';

type Props = {};
type State = {
  currentUser: IUser | undefined
}


const App: React.FC<any> = ({Props, State}) => {
  const [currentUser, setCurrentUser] = useState()
  // define theme
  
  useEffect(() => {
      setCurrentUser(undefined)
      
      const user = AuthService.getCurrentUser();
      if (user) setCurrentUser(user)
      else AuthService.dummyLogin()
  }, [])


  const theme = createTheme({
    palette: {
      primary: {
        light: "#63b8ff",
        main: "#0989e3",
        dark: "#005db0",
        contrastText: "#000",
      },
      secondary: {
        main: "#4db6ac",
        light: "#82e9de",
        dark: "#00867d",
        contrastText: "#000",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
