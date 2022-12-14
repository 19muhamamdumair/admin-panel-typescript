import React, { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Edit_icon from "../../assets/Images/Edit_icon.png";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import {
  permission,
  permissionTypes,
  group_permissions,
} from "../../data/Permission";
import { makeStyles } from "@mui/styles";
import { DialogProps } from "@mui/material";
import { DialogContent } from "@mui/material";
import { group_Role } from "../../data/Role";
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
  select: {
    "&:before": {
      // borderColor: "white",
      borderBottom: "none",
    },

    "&:hover": {
      borderBottom: "none",
      "&:before": {
        // borderColor: "white",
        // backgroundColor:'blue'
        borderBottom: "none",
      },
    },
  },
  icon: {
    fill: "#0989e3",
    marginLeft: "-2em",
  },
});
const UsersModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [checkedFlag, setCheckedFlag] = React.useState(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  const [flag, setFlag] = React.useState(0);
  const [groupPermission, setGroupPermission] =
    useState<any>(group_permissions);
  const [permissionInfo, setPermissionsInfo] = useState<any>(permission);

  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [currentRole, setCurrentRole] = useState<any>("");
  const [roles, setRoles] = useState<any>(group_Role);

  const [originalRoles, setOriginalRoles] = useState<any>(group_Role);
  const [disableUserName, setDisableUserName] = useState<boolean>(true);
  const [disableEmail, setDisableEmail] = useState<boolean>(true);
  const [changeDataFlag, setChangeDataFlag] = useState<boolean>(false);
  const [changeRole,setChangeRole]=useState<any>(0)

  const inputRef: any = React.useRef();
  let inputElement: any = useRef();
  const classes = useStyles();

    
  useEffect(() => {
    if (flag) {
      setPermissionsInfo(
        roles.map((permission: any) => ({
          ...permission,
          checked: isSelectAllChecked,
        }))
      );
    }
    setFlag(1);
  }, [isSelectAllChecked]);


  const focusInput = () => {
    inputElement.current.focus();
    inputElement.current.click();
    console.log(inputElement);
  };

  const checkAllPermissions = (isChecked?: boolean) => {
    
    roles.map((singleRole: any) => {
      singleRole.permissions_groups.map(( singlePG: any) => {
         singlePG.checked = isChecked;
         singlePG.permissions.map(( singlePermission: any) => {
           singlePermission.checked = isChecked;
        });
      });
    });


    setRoles(roles);
    setCheckedFlag(!checkedFlag);
  };


  const CheckParentAndChildPermission = (
    parentId: any,
    event?: any,
    isChecked?: boolean
  ) => {
    // setChangeDataFlag(!changeDataFlag);
    // debugger
    console.log(event, isChecked);
    roles.map(( singleRole: any, index: number) => {
      singleRole.permissions_groups.map((pg: any) => {
        if (pg.permission_group_id === parentId) {
          pg.checked = isChecked;
          pg.permissions.map(( singlePermission: any, index: any) => {
             singlePermission.checked = isChecked;
          });
        }
      });
    });


    setRoles(roles);

    setCheckedFlag(!checkedFlag);
  };



  const CheckChildPermission = (
     singlePGId: any,
    permissionGroupId: any,
    isChecked?: boolean
  ) => {
    // setChangeDataFlag(!changeDataFlag);

    roles.map((role: any, index: number) => {
      role.permissions_groups.map(( singlePG: any) => {
        if ( singlePG.permission_group_id ===  singlePGId) {
          var isAnyPermissionCheckedflag = false;
           singlePG.permissions.find(
            ( singlePermission: any, index: any) => {
              if ( singlePermission.id === permissionGroupId) {
                 singlePermission.checked = isChecked;
              }
              if ( singlePermission.checked)
                isAnyPermissionCheckedflag = true;
            }
          );

           singlePG.checked = isAnyPermissionCheckedflag || false;
        }
      });
    });


    setRoles(roles);
    setCheckedFlag(!checkedFlag);
  };


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

  const showModal = (scrollType: DialogProps["scroll"]) => {
    setIsModalVisible(true);
    setScroll(scrollType);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const changePermissions = (roleValue: string) => {
  
    setCurrentRole(roleValue);
    setChangeRole(roleValue)
    setRoles(
      originalRoles.filter(( singlePG: any) =>  singlePG.id === roleValue)
    );

   
    setChangeDataFlag(!changeDataFlag);
  };
  useEffect(() => {
    let change:any=0;
     ;
    {
      roles.map(( singlePG: any) => {
         
         singlePG.permissions_groups?.map((p: any) => {
          groupPermission?.map((gp: any) => {
            if (p.permission_group_id === gp.id) {
              {
                p.permissions?.map((singlePermission: any) => {
               
                  if (singlePermission.checked === false) {
                   
                    change=1
                    
                  }
                 
                });
              }
            }
          });
           ;
        });
      });
    }
  //  debugger
 if(change===1) setChangeRole(0)
 else setChangeRole(currentRole)

  }, [checkedFlag]);
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
        onClick={() => showModal("paper")}
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
          User Name
        </DialogTitle>
        <DialogContent
          dividers={scroll === "paper"}
          sx={{ overflowX: "hidden" }}
        >
          <Grid
            item
            container
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            sx={{ marginLeft: "20px" }}
            direction={"column"}
          >
            {/* <Grid  item direction={"column"} > */}

            <Grid container item sx={{ mt: 2 }}>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  width: {
                    xl: "95%",
                    lg: "95%",
                    md: "95%",
                    sm: "95%",
                    xs: "95%",
                  },
                }}
                hiddenLabel
                id="filled-hidden-label-small"
                size="small"
                placeholder="User Name"
                disabled={disableUserName}
                // inputRef={inputRef}
                inputRef={inputElement}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => {
                          console.log(disableUserName);
                          setDisableUserName(!disableUserName);
                          focusInput();
                          console.log(disableUserName);
                        }}
                      >
                        <Box
                          component="img"
                          src={Edit_icon}
                          sx={{ wdith: "10px", height: "10px" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ mt: 2 }}
            >
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  width: {
                    xl: "95%",
                    lg: "95%",
                    md: "95%",
                    sm: "95%",
                    xs: "95%",
                  },
                  fontStyle: "italic",
                }}
                hiddenLabel
                id="filled-hidden-label-small"
                size="small"
                placeholder="email"
                disabled={disableEmail}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => setDisableEmail(!disableEmail)}
                      >
                        <Box
                          component="img"
                          src={Edit_icon}
                          sx={{ wdith: "10px", height: "10px" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {/* </Grid> */}

            <Grid container>
              <Grid item xl={3} lg={3} md={3} sm={4} xs={6}>
                <Box sx={{ mt: 2.5, fontSize: 16 }}>Current Role</Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mt: 1, fontSize: 16 }}>
                  {/* <Grid item> */}
                  <FormControl>
                    <InputLabel
                      variant="outlined"
                      sx={{ fontSize: "11px", color: "#0989e3" }}
                    >
                      Change role
                    </InputLabel>
                    <Box
                      sx={{
                        width: { xl: 129, lg: 129, md: 129, sm: 129, xs: 100 },
                      }}
                    >
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        notched
                        value={changeRole}
                        sx={{
                          width: {
                            xl: "100%",
                            lg: "100%",
                            md: "100%",
                            sm: "100%",
                            xs: "100%",
                          },
                          height: 40,

                          p: 1,
                          color: "black",
                          // fontSize: "9px",
                        }}
                        className={classes.select}
                        inputProps={{
                          classes: {
                            icon: classes.icon,
                          },
                        }}
                        label="Existing Groupsssss"
                        variant="standard"
                        onChange={(event: any) =>
                          changePermissions(event.target.value)
                        }
                      >
                        <MenuItem value="0" key="0">None</MenuItem>
                        {originalRoles.map((role: any) => (
                          <MenuItem key={role.id} value={role.id}>
                            {role.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  </FormControl>
                  {/* </Grid> */}
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: "0px" }}>
              <Grid item xs={12} sm={8} md={8} xl={8}>
                <Box sx={{ fontSize: 15 }}>Edit Permissions</Box>
                <Box sx={{ fontSize: 12, mt: 1, fontWeight: "bold" }}>
                  PERMISSION GROUP (click to expand & edit individual
                  permissions)
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
                      checkAllPermissions(isChecked);
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
          <Container sx={{ borderBottom: "4em" }}>
            <Grid container spacing={2}>
              {roles.map(( singlePG: any) => {
                 
                return  singlePG.permissions_groups?.map((p: any) => {
                  return groupPermission?.map((gp: any) => {
                    if (p.permission_group_id === gp.id) {
                      return (
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <FormControlLabel
                            classes={{ label: classes.label }}
                            sx={{ fontSize: "4px", mt: -4 }}
                            label={gp.name}
                            control={
                              <Checkbox
                                size="small"
                                // indeterminate={checked[0] !== checked[1]}
                                value={p.checked}
                                checked={p.checked}
                                onChange={(event, isChecked) =>
                                  CheckParentAndChildPermission(
                                    p.permission_group_id,
                                    event,
                                    isChecked
                                  )
                                }
                              />
                            }
                          />
                          {p.permissions?.map((singlePermission: any) => {
                    
                            return permissionInfo?.map((gp: any) => {
                              if (singlePermission.id === gp.id) {
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
                                        <Typography
                                          sx={{ fontSize: 12 }}
                                          color="black"
                                        >
                                          {gp.label}
                                        </Typography>
                                      }
                                      control={
                                        <Checkbox
                                          size="small"
                                          value={singlePermission.checked}
                                          checked={singlePermission.checked}
                                          onChange={(
                                            event: any,
                                            isChecked: boolean
                                          ) => {
                                          
                                            CheckChildPermission(
                                              p.permission_group_id,
                                              singlePermission.id,

                                              isChecked
                                            );
                                          }}
                                        />
                                      }
                                    />
                                  </Box>
                                );
                              }
                            });
                          })}
                        </Grid>
                      );
                    }
                  });
    
                });
              })}
            </Grid>
          </Container>

          <Box
            sx={{
              // borderTop: "1px solid grey",
              marginTop: 8,
              // boxShadow: 10,
            }}
          ></Box>
        </DialogContent>
        <Grid>
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

export default UsersModal;

{
  /* <Container sx={{ borderBottom: "4em" }}>
            <Grid container spacing={2}>
              {roles.map(( singlePG: any) => {
              
                 ;
                return (
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <FormControlLabel
                      classes={{ label: classes.label }}
                      sx={{ fontSize: "4px", mt: -4 }}
                      label={ singlePG.name}
                      control={
                        <Checkbox
                          size="small"
                          // indeterminate={checked[0] !== checked[1]}
                          value={ singlePG.checked}
                          checked={ singlePG.checked}
                          onChange={(event, isChecked) =>
                            CheckParentAndChildPermission(
                               singlePG.id,
                              event,
                              isChecked
                            )
                          }
                        />
                      }
                    />
                    { singlePG.permissions_groups?.map((p: any) => {
                       
                      return groupPermission?.map((gp: any) => {
                        if (p.permission_group_id === gp.id) {
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
                                  <Typography
                                    sx={{ fontSize: 12 }}
                                    color="black"
                                  >
                                    {gp.name}
                                  </Typography>
                                }
                                control={
                                  <Checkbox
                                    size="small"
                                    value={p.checked}
                                    checked={p.checked}
                                    onChange={(
                                      event: any,
                                      isChecked: boolean
                                    ) =>
                                      CheckChildPermission(
                                         singlePG.id,
                                        p.permission_group_id,
                                        isChecked
                                      )
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
                );
              })}
            </Grid>
          </Container> */
}
