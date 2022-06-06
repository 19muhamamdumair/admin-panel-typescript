import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {useState, useEffect} from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { NavLink } from "react-router-dom";
import getLocalStorageServices from "../../services/local-storage.service"
import { Link, FormControl, InputLabel, NativeSelect } from "@mui/material";
import IUser from "../../types/user.type";
const drawerWidth = 240;
interface Props {
  openMobile:any,
  mobileOpenValue:any

}
export default function ResponsiveDrawer(props: Props) {
 const [user, setUser] = useState<IUser>();


  useEffect(() => {

   
    setUser(getLocalStorageServices.getLocalStorageObject("user"));
  },[])
  const handleDrawerToggle = () => {
    props.openMobile(!props.mobileOpenValue)
    
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
      <Typography color="GREY" sx={{fontSize:'10px',paddingLeft:'1em'}}>
              ADMINISTRATION
            </Typography>
        {/* <p className=' px-3 admin-col'>ADMINISTRATOR</p> */}
       <Box sx={{marginTop:'10px'}}>
        <Link component={NavLink}  to="/" color="white" underline="none" sx={{paddingLeft:'2em'}}>Users</Link>
        </Box>
        <Box sx={{marginTop:'10px'}}>
        <Link component={NavLink}  to="/permissions" color="white" underline="none" sx={{paddingLeft:'2em'}}>Permissions</Link>
        {/* <NavLink  className="px-5 mt-5 link-set"  to="/permissions">Permissions</NavLink> */}
        </Box>
        <Box sx={{marginTop:'10px'}} >
        <Link component={NavLink}  to="/Role" color="white" underline="none" sx={{paddingLeft:'2em'}}>Role</Link>
        {/* <NavLink className="px-5 mt-4 link-set"  to="/Role">Role</NavLink> */}
        </Box>
      </List>
     
    </div>
  );


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
     
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
        aria-label="mailbox folders"
      >

        <Drawer
        
          variant="temporary"
          open={props.mobileOpenValue}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor:'black', },

          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor:'black', },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, px: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
}
// export default ResponsiveDrawer;