import React, { ReactElement, FC } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import PermissionsTable from "../components/Permissions/PermissionsTable";


const Permissions: FC<any> = (): ReactElement => {
  const handleClick = () => {
    alert("clicked");
  };
  return (
    <Paper elevation={0} sx={{backgroundColor: "whitesmoke"}}>
      <Grid sx={{marginLeft:'auto',marginRight:'auto',marginTop:'3em',}}  container xs={12} sm={10} md={8} lg={8} xl={8}  >
        <Grid   item container  direction="row" sx={{marginBottom:'2em'}}>
          <Grid   item xs={12} md={6}  lg={6} xl={6} >
            <Box sx={{display:{xs:'flex'},justifyContent:{xs:'center',xl:'flex-start',md:'flex-start',lg:'flex-start'},fontWeight:'bold'}} >
              Permission Page
              </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6} xl={6} >
            <Box display="flex" justifyContent="flex-end" sx={{justifyContent:{xs:'center',xl:'flex-end',md:'flex-end',lg:'flex-end'}}}>
            <Button
              sx={{
                  backgroundColor: "#47959e",
                  color:'white',
                  fontSize:'13px',
                 textTransform:'none'
              }}
              variant="contained"
              onClick={handleClick}

            >
              Create Permission Group
            </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid item container direction="row" justifyContent="center" xs={12} sm={12} lg={12} md={12} xl={12} alignItems="center">
            <PermissionsTable />
        </Grid>

     

        
      </Grid>
    </Paper>
  );
};

export default Permissions;
