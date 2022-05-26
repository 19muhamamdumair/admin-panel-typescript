import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useState, useEffect} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { routes } from "../routes";
import { NavLink } from "react-router-dom";
import getLocalStorageServices from "../services/local-storage.service"

import { Link, FormControl, InputLabel, NativeSelect } from "@mui/material";
import IUser from "../types/user.type";
const drawerWidth = 240;

interface Props {
 
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {

  
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const container = window !== undefined ? () => window().document.body : undefined;
  const [user, setUser] = useState<IUser>();


  useEffect(() => {
    setUser(getLocalStorageServices.getLocalStorageObject("user"));
  },[])
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <p className=' px-3 admin-col'>ADMINISTRATOR</p>
        <NavLink className="px-5 link-set"  to="/">User</NavLink>
        <div className="mt-3">
        <NavLink className="px-5 mt-5 link-set"  to="/permissions">Permissions</NavLink>
        </div>
        <div className="mt-3">
        <NavLink className="px-5 mt-4 link-set"  to="/Role">Role</NavLink>
        </div>
      </List>
     
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className="navbar-set"
        sx={{
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
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography> */}
          <div className="ms-auto me-3 d-flex">
            <Avatar alt="Travis Howard me-5" src="/static/images/avatar/2.jpg" />
           
          </div>
          <li className="nav-item dropdown mb-4">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">{user?.firstname + " "+ user?.lastname}</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </li>
         


        </Toolbar>

      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
        aria-label="mailbox folders"
      >

        <Drawer
        
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: 'black' },

          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
}
