import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";

import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import DropDown from "./AvatarDropDown";
import { NavLink } from "react-router-dom";
import getLocalStorageServices from "../../services/local-storage.service";

import { Link, FormControl, InputLabel, NativeSelect } from "@mui/material";
import IUser from "../../types/user.type";
import Drawer from "../Sidebar/Drawer";
const drawerWidth = 240;

interface Props {
  openMobile:any,
  mobileOpenValue:any
}

export default function Navbar(props: Props) {
  const {  } = props;
  // const [mobileOpen, setMobileOpen] = useState<any>(false);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    setUser(getLocalStorageServices.getLocalStorageObject("user"));
  }, []);
  const handleDrawerToggle = () => {
    props.openMobile(!props.mobileOpenValue)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="navbar-set"
        sx={{
          backgroundColor: "white",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ marginLeft: "auto", marginRight: "1em", display: "flex" }}>
            <DropDown />
          </Box>
        </Toolbar>
      </AppBar>

    </Box>
  );
}
