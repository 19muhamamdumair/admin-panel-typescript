import React, { useEffect, FC, ReactElement, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";

import "./index.css"
import AuthService from "./services/auth.service";
import IUser from './types/user.type';
import ResponsiveDrawer from "./components/Drawer"
import { Box } from "@mui/system";
import Navbar from './components/Navbar'
type Props = {};
type State = {
  currentUser: IUser | undefined
}


const App: React.FC<any> = ({Props, State}) => {
  const [currentUser, setCurrentUser] = useState<IUser>()
  const [mobileOpen, setMobileOpen] = useState<any>(false)
  // define theme
  
  useEffect(() => {
      setCurrentUser(undefined)
      const user = AuthService.getCurrentUser();
      if (user) setCurrentUser(user)
      else AuthService.dummyLogin()
      
    
  }, [])
  const openMobile=()=>{
    console.log(mobileOpen)
    setMobileOpen(!mobileOpen)
  }
  useEffect(() =>{
    // console.log("asdasd",mobileOpen)
  },[mobileOpen])

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
      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
          <ResponsiveDrawer openMobile={openMobile} mobileOpenValue={mobileOpen} />
          <Navbar openMobile={openMobile} mobileOpenValue={mobileOpen}/>
          <Box sx={{ 
             marginLeft: {
              xl: "240px",
              sm: "240px",
              lg: "240px",
              md: "240px",
              xs: "0px",
            }, 
          }} height="100vh" display="flex" flexDirection="column"  bgcolor='whitesmoke'>
            <Routes>
              {appRoutes.map((route) => (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
            </Routes>
          </Box>
        </Router>
      </Box>
      
    </ThemeProvider>
    
  );
}

export default App;
