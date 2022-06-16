import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { makeStyles } from '@mui/material';
interface Props{
  setNavName:any,
  navName:any
}
export default function UserNavbar(props:Props) {
  const [navValue, setNavValue] = React.useState(props.navName);
  
 
  const getNavValue=()=>{
    // debugger
    if(props.navName==="all"&&navValue!=="all")
    {
      setNavValue("all")
    }
    return navValue
  }
// console.log(value)
  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };

  return (
    <BottomNavigation sx={{ width: "100%",justifyContent:"flex-start",maxHeight:'45px',borderBottom:'2px solid whitesmoke'}} showLabels={true} value={getNavValue()}  
    onChange={(event, newValue) => {
      setNavValue(newValue)
      props.setNavName(newValue);
    }}>
      <BottomNavigationAction
        label="All"
        value="all"
        
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
