import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
import { DialogProps } from "@mui/material";
import { DialogContent } from "@mui/material";

const useStyles = makeStyles({
  toasterColor: {
    background: "#28a745",
  },
  label: {
    fontSize: "3.2em",
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
  const [checkedFlag, setCheckedFlag] = React.useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  const [flag, setFlag] = React.useState(0);
  const [groupPermission, setGroupPermission] =
    useState<any>(group_permissions);
  const [permissionInfo, setPermissionsInfo] = useState<any>(permission);
 
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');


  const checkAllPermissions=(isChecked? : boolean)=>
  {
    groupPermission.map((singleGrouppermission:any)=>{
      singleGrouppermission.checked=isChecked
      singleGrouppermission.permissions.map((singlePermission:any)=>{
        singlePermission.checked=isChecked
      })
    })
    setGroupPermission(groupPermission)
    setCheckedFlag(!checkedFlag);
  }
  const CheckParentAndChildPermission = (parentId: any,event? : any,isChecked? : boolean) => {
    console.log(event,isChecked)
    groupPermission.map((singleGrouppermission: any, index: number) => {
      if (singleGrouppermission.id === parentId) {
        singleGrouppermission.checked = isChecked;
        singleGrouppermission.permissions.map((singlePermission: any, index: any) => {
          singlePermission.checked = isChecked;
        });
      }
    });
    setGroupPermission(groupPermission);
    // debugger;
    setCheckedFlag(!checkedFlag);
  };
  useEffect(() => {
    // debugger;
    console.log(groupPermission);
    if (flag) {
      setPermissionsInfo(
        groupPermission.map((permission: any) => ({
          ...permission,
          checked: isSelectAllChecked,
        }))
      );
    }
    setFlag(1);
  }, [isSelectAllChecked]);

  const CheckChildPermission = (groupId: any, permissionId: any, isChecked? : boolean) => {
    
    groupPermission.map((singleGroupPermission: any, index: number) => {
      if (singleGroupPermission.id === groupId) {
        var isAnyPermissionCheckedflag = false
        singleGroupPermission.permissions.find((singlePermission: any, index: any) => {
          if (singlePermission.id === permissionId) {
            singlePermission.checked = isChecked;
          }
          if(singlePermission.checked) isAnyPermissionCheckedflag = true

        });

        singleGroupPermission.checked = isAnyPermissionCheckedflag || false
      }
    });
    setGroupPermission(groupPermission);
    setCheckedFlag(!checkedFlag);
    
  };
  
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

  const showModal = (scrollType: DialogProps['scroll']) => {
    setIsModalVisible(true);
    setScroll(scrollType);
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
        onClick={()=>showModal('paper')}
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
        scroll={scroll}
      >
        <DialogTitle sx={{ borderBottom: "1px solid grey" }}>
          User Role Name
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'} sx={{overflowX:'hidden'}}>
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
              <Box sx={{ mt: 2, fontSize: 16 }}></Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={8} md={8} xl={8}>
              <Box sx={{ fontSize: 15 }}>Edit Permissions</Box>
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
                  onChange={(e: any, isChecked: boolean) => {
                   checkAllPermissions(isChecked)
                  }}
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
            ></Box>
          </Grid>
        </Grid>
        <Container sx={{borderBottom:'4em'}}>
          <Grid container spacing={2}>
            {groupPermission.map((data: any) => (
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <FormControlLabel
                  classes={{ label: classes.label }}
                  sx={{ fontSize: "4px", mt: -4 }}
                  label={data.name}
                  control={
                    <Checkbox
                      size="small"
                      // indeterminate={checked[0] !== checked[1]}
                      value={data.checked}
                      checked={data.checked}
                      onChange={(event,isChecked) => CheckParentAndChildPermission(data.id,event,isChecked)}
                    />
                  }
                />

                {/* {children(data.permissions)} */}

                {data.permissions.map((p: any) => {
                  return permissionInfo.map((sp: any) => {
                    if (p.id === sp.id) {
                      return (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            ml: 3,
                            mt: "-20px",
                          }}
                        >
                          <FormControlLabel
                            sx={{ marginTop: "7px" }}
                            label={
                              <Typography sx={{ fontSize: 12 }} color="black">
                                {sp.label}
                              </Typography>
                            }
                            control={
                              <Checkbox
                                size="small"
                                value={p.checked}
                                checked={p.checked}
                                onChange={(event:any,isChecked:boolean) =>
                                  CheckChildPermission(data.id, p.id,isChecked)
                                }
                              />
                            }
                          />
                        </Box>
                      );
                    }
                  });
                })}
              </Grid>
            ))}
          </Grid>
        </Container>
      
        <Box   sx={{
              // borderTop: "1px solid grey",
              marginTop: 8,
              // boxShadow: 10,
            
            }}>

        </Box>
        </DialogContent>
        <Grid >
          <DialogActions
            sx={{
              borderTop: "1px solid grey",
              // marginTop: 8,
              boxShadow: 10,
            
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
};

export default RoleModal;
