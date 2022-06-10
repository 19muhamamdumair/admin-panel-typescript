import React, { ReactElement, FC } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import PermissionsTable from "../components/Permissions/PermissionsTable";
import PermissionModal from "../components/Permissions/PermissionModal"
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';
import UsersTable from "../components/Users/UsersTable";
import UsersModal from "../components/Users/UsersModal";
import UserNavbar from "../components/Users/UserNavbar";

const Users: FC<any> = (): ReactElement => {
  
  return (
    <Paper elevation={0} sx={{backgroundColor: "whitesmoke"}}>
      <Grid item sx={{marginLeft:'auto',marginRight:'auto',marginTop:'1em',}}  container xs={12} sm={10} md={8} lg={11} xl={10}  >
        <Grid   item container  direction="row" sx={{marginBottom:'1em'}}>
          <Grid   item xs={12} md={6}  lg={6} xl={6} >
            <Box sx={{display:{xs:'flex'},justifyContent:{xs:'center',xl:'flex-start',md:'flex-start',lg:'flex-start'},fontWeight:'bold'}} >
              Users Page
              </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6} >
            <Box display="flex" justifyContent="flex-end" sx={{justifyContent:{xs:'center',xl:'flex-end',md:'flex-end',lg:'flex-end'}}}>
          
          <UsersModal />
            </Box>
          </Grid>
        </Grid>
        <Grid item container direction="row"  xs={12} sm={12} lg={12} md={12} xl={12} >
          <Grid container sx={{height:600}} >
          <UsersTable />
        </Grid>
            
        </Grid>

     

        
      </Grid>
    </Paper>
  );
};

export default Users;
