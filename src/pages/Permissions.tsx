import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import Drawer from "../components/Drawer"
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import BasicModal from "../components/modal/permissions/PermissionModal"



const Permissions: FC<any> = (): ReactElement => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
 

  return (
    <>
      <div className="drawer-index">
        <Drawer />
      </div>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <Item>xs=8</Item>
        </Grid>
        <Grid item xs={8} mt={10}>
          <BasicModal  />
        </Grid>

      </Grid>


    </>
  );
};

export default Permissions;