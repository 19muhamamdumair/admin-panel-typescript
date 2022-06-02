import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from "@mui/material/Checkbox";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';



import {
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  Snackbar,
} from "@mui/material";
import {
  permission,
  permissionTypes,
  group_permissions,
} from "../../../data/Permission";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  toasterColor: {
    background: "#28a745",
  },
  label: {
    fontSize: '3.2em'
  },

  flow: {
    overflowX: "hidden",
  },
  inputlabel: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    width: "100%",
    color: "red",
  },


  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "blue",
    },
  },
});
const RoleModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState([true, false]);
  const [permissionInfo, setPermissionsInfo] = useState<any>(permission)
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (permissions: any) => {
    let newarr: any = [];
    // debugger
    permissions.map((singlePermission: any) => {
      let temp = permissionInfo.find((p: any) => singlePermission.permission_id === p.permission_id)
      newarr.push(temp)
    })
    console.log(newarr);
  
   return newarr.map((permission:any)=>(
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3, mt: "-20px" }}>
      <FormControlLabel
        label={<Typography sx={{ fontSize: 12 }} color="black">{permission.label}</Typography>}
        control={<Checkbox size="small" checked={checked[0]} onChange={handleChange2} />}
      />
    </Box>
    ))
      
    

    


  }


  const classes = useStyles();
 

  const handleToaster = () => {
    setOpen(true);
    setIsModalVisible(false);
  };

  const closeToaster = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        sx={{
          backgroundColor: "#47959e",
          color: "white",
          fontSize: "13px",
          textTransform: "none",
        }}
        variant="contained"
        onClick={showModal}
      >
        Create User
      </Button>
      <Dialog
        open={isModalVisible}
        onClose={handleCancel}
        sx={{ overflowX: "hidden" }}
        PaperProps={{
          classes: { root: classes.flow },
          sx: { position: "fixed", top: 0 },
        }}
      >
        <DialogTitle sx={{ borderBottom: "1px solid grey" }}>
          User Role Name
        </DialogTitle>
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ marginLeft: "20px" }}
        >
          <Grid item direction={"column"} lg={12} xl={12}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Box sx={{ mt: 2, fontSize: 12, fontWeight: "bold" }}>
                Role Name
              </Box>
            </Grid>

            <Grid item xs={3} sm={3} md={6} lg={6} xl={6}>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  width: { xl: 370, lg: 370, md: 370, sm: 370, xs: 220 },
                }}
                hiddenLabel
                id="filled-hidden-label-small"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ mt: 2, fontSize: 16 }}>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8} xl={8} >
              <Box sx={{ fontSize: 15 }}>
                Edit Permissions
              </Box>
              <Box sx={{ fontSize: 12, mt: 1, fontWeight: "bold" }}>
                PERMISSION GROUP (click to expand & edit individual permissions)

              </Box>
            </Grid>
            <Grid item xs={12} sm={4} md={3} xl={4}>

              <Button
                variant="outlined"
                sx={{
                  height: 40,
                  wdith: 40,

                  color: "black",
                  borderColor: "lightgrey",
                  px: 1,

                  fontSize: 10,
                }}
              >
                <Checkbox
                />
                Select All
              </Button>
            </Grid>
          </Grid>


          <Grid item container>
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  lg: "row",
                  sm: "row",
                  xl: "row",
                  md: "row",
                },
                mt: 4,
              }}
            >
            </Box>
          </Grid>


        </Grid>
        <Container>
          <Grid container spacing={2}>
            {group_permissions.map((data) => (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  classes={{ label: classes.label }}

                  sx={{ fontSize: "4px", mt: -4 }}
                  label={data.name}
                  control={
                    <Checkbox
                      size="small"
                      checked={checked[0] && checked[1]}
                      indeterminate={checked[0] !== checked[1]}
                      onChange={handleChange1}
                    />
                  }
                />

              


                {children(data.permissions)}

              </Grid>
            ))}

          </Grid>
        </Container>
        <Grid item>
          <DialogActions
            sx={{
              borderTop: "1px solid grey",
              marginTop: 8,
              boxShadow: 10,
              overflow: "hidden",
            }}
          >
            <Button
              sx={{ border: "2px solid whitesmoke" }}
              onClick={handleCancel}
              autoFocus
            >
              Cancel
            </Button>
            <Button
              sx={{
                backgroundColor: "#47959e",
                color: "white",
                "&:hover": {
                  backgroundColor: "#0989e3",
                },
              }}
              autoFocus
              onClick={handleToaster}
            >
              Save
            </Button>
          </DialogActions>
        </Grid>
      </Dialog>
      <Paper>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={closeToaster}
          message="Saved"
          ContentProps={{
            classes: {
              root: classes.toasterColor,
            },
          }}
          sx={{
            marginLeft: {
              xl: "240px",
              lg: "240px",
              md: "240px",
              sm: "240px",
              xs: 0,
            },
            width: "200px",
            backgroundColor: "green !important",
            "&.MuiPaper-root-MuiSnackbarContent-root": {
              backgroundColor: "green",
            },
          }}
        />
      </Paper>
    </>
  );
}


export default RoleModal;
