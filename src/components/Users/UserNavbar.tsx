import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { makeStyles } from '@mui/material';

export default function UserNavbar() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width: "100%",justifyContent:"flex-start",maxHeight:'45px',borderBottom:'2px solid whitesmoke'}} showLabels={true} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="All"
        value="All"
        sx={{maxWidth:'82px',
        "&.Mui-selected": {
            // backgroundColor:'blue',
            borderBottom:'2px solid green',
            color:'black'
          }
    }}
    
        
      />
      <BottomNavigationAction
        label="Active"
        value="Active"
        sx={{maxWidth:'82px',  "&.Mui-selected": {
            // backgroundColor:'blue',
            borderBottom:'2px solid green',
            color:'black'
          }}}
      />
      <BottomNavigationAction
        label="Suspended"
        value="Suspended"
        sx={{maxWidth:'82px',  "&.Mui-selected": {
            // backgroundColor:'blue',
            borderBottom:'2px solid green',
            color:'black'
          }}}
      />
       <BottomNavigationAction
        label="Pending"
        value="Pending"
        sx={{maxWidth:'82px',  "&.Mui-selected": {
            // backgroundColor:'blue',
            borderBottom:'2px solid green',
            color:'black'
          }}}
      />
  
    </BottomNavigation>
  );
}
