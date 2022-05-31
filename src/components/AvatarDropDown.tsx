import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Typography } from '@mui/material';
import getLocalStorageServices from "../services/local-storage.service"
import { useState } from 'react';
import { useEffect } from 'react';
import IUser from "../types/user.type";
export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [user, setUser] = useState<IUser>();


  useEffect(() => {

    setUser(getLocalStorageServices.getLocalStorageObject("user"));
  
  },[])
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        
      >
         <Avatar alt="Travis Howard me-5" src="/static/images/avatar/2.jpg" sx={{color:'black',backgroundColor:'#47959e'}} > {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}</Avatar>
         <Typography color='black' sx={{textTransform:'none',marginLeft:"8px"}}>
         {user?.firstname + " "+ user?.lastname}
         </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{  
          style: {  
            width: 150,  
          },  
       }} 
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
