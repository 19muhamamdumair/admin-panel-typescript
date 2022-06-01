import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  InputAdornment,
  Snackbar,
  Typography,
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
const BasicModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [ischeckBoxChecked, setIscheckBoxChecked] = useState<boolean>(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  const [permissionsInfo, setPermissionsInfo] = useState<any>(permission);
  const [allPermissions, setAllPermissions] = useState<any>(permission);
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = useState<any>("");
  const [groupPermissionName, setGroupPermissionName] = useState<string>("");
  const [flag, setFlag] = React.useState(0);
  const [permissionType, setPermissionType] = useState<string>("");

  const [groupFlag, setGroupFlag] = useState<boolean>(false);
  const [typeFlag, setTypeFlag] = useState<boolean>(false);
  const classes = useStyles();
  const [groupData, setGroupData] = useState<any>([{}]);
  const [typeData, setTypeData] = useState<any>([{}]);
  useEffect(() => {
    if (flag) {
      setPermissionsInfo(
        permissionsInfo.map((permission: any) => ({
          ...permission,
          checked: isSelectAllChecked,
        }))
      );
    }
    setFlag(1);
  }, [isSelectAllChecked]);

  useEffect(() => {
    if (groupPermissionName !== "" && groupPermissionName !== "none") {
      setGroupFlag(true);
      filterGroupPermission();
    } else {
      setGroupFlag(false);
    }
    if (permissionType !== "none" && groupPermissionName === "none") {
      setPermissionsInfo(typeData);
    }
  }, [groupPermissionName]);

  useEffect(() => {
    if (permissionType !== "" && permissionType !== "none") {
      setTypeFlag(true);
      filterTypePermission();
    } else {
      setTypeFlag(false);
    }
    if (permissionType === "none" && groupPermissionName !== "none") {
      setPermissionsInfo(groupData);
    }
  }, [permissionType]);
  useEffect(() => {
    if (
      (permissionType === "none" && groupPermissionName === "none") ||
      (permissionType === "" && groupPermissionName === "") ||
      (permissionType === "none" && groupPermissionName === "") ||
      (permissionType === "" && groupPermissionName === "none")
    ) {
      setPermissionsInfo(allPermissions);
    }
  }, [permissionType, groupPermissionName]);
  const filterTypePermission = () => {
    let filterId: any;
    permissionTypes.find((type) => {
      if (type.name === permissionType) {
        filterId = type.id;
      }
    });

    let filterData = allPermissions.filter((permission: any) => {
      return permission.permission_type_id === filterId;
    });

    setTypeData(filterData);

    if (groupFlag) {
      groupFlagFunction(groupData, filterData);
    } else {
      setPermissionsInfo(filterData);
    }
  };
  const FilterPermission = (e: any) => {
    setSearchTerm(e.target.value);
  };
  const groupFlagFunction = (filterPermissionIds: any, filterData: any) => {
    let newData: any = [];

    filterPermissionIds.map((permission: any) => {
      let tempData = filterData.find(
        (data: any) => permission.permission_id === data.permission_id
      );
      if (tempData) {
        newData.push(tempData);
      }
    });
    setPermissionsInfo(newData);
  };
  const filterGroupPermission = () => {
    let newarr: any = [];
    group_permissions.map((singleGroup) => {
      if (singleGroup.name === groupPermissionName) {
        newarr = singleGroup.permissions.map((f) => f.permission_id);
      }
    });

    let filterData: any = [];
    for (let i = 0; i < newarr.length; i++) {
      let tempPermission = allPermissions.find(
        (permission: any) => permission.permission_id === newarr[i]
      );

      if (tempPermission) {
        filterData.push(tempPermission);
      }
    }

    setGroupData(filterData);
    if (typeFlag) {
      groupFlagFunction(typeData, filterData);
    } else {
      setPermissionsInfo(filterData);
    }
  };

  const permissionSelection = (event: any, checked: boolean) => {
    permissionsInfo.map((permission: any, index: number) => {
      if (permission.id == event.target.value) {
        permissionsInfo[index].checked = !permission.checked;
      }
    });

    setPermissionsInfo(permissionsInfo);
    setIscheckBoxChecked(!ischeckBoxChecked);
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
        Create Permission Group
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
          Permissions Group Name
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
                Permissions Group Name
              </Box>
            </Grid>
            <Grid item xs={3} sm={3} md={6} lg={6} xl={6}>
              <TextField
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  width: { xl: 370, lg: 370, md: 370, sm: 370, xs: 220 },
                }}
                // placeholder="Filter by Permission Group"
                hiddenLabel
                id="filled-hidden-label-small"
                size="small"
                onChange={FilterPermission}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <SearchIcon />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Box sx={{ mt: 2, fontSize: 12, fontWeight: "bold" }}>
                Filter Permissions
              </Box>
            </Grid>

            <Grid item xs={3} sm={3} md={6} lg={6} xl={6}>
              <Box>
                <TextField
                  type={"search"}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                    width: { xl: 370, lg: 370, md: 370, sm: 370, xs: 220 },
                  }}
                  placeholder=" Filter by Permission Name"
                  hiddenLabel
                  id="filled-hidden-label-small"
                  size="small"
                  onChange={FilterPermission}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
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
              <Grid item xs={12}>
                <FormControl>
                  <InputLabel
                    sx={{ fontSize: 11, fontWeight: "bold" }}
                    id="demo-simple-select-label"
                  >
                    Permission Type
                  </InputLabel>
                  <Box
                    sx={{
                      width: { xl: 129, lg: 129, md: 129, sm: 129, xs: 220 },
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={permissionType}
                      sx={{
                        width: {
                          xl: "100%",
                          lg: "100%",
                          md: "100%",
                          sm: "100%",
                          xs: "100%",
                        },
                        height: 40,
                        mb: 1,
                        fontSize: "9px",
                      }}
                      label="Permission Type dsfs"
                      onChange={(e) => setPermissionType(e.target.value)}
                    >
                      <MenuItem value="none" key="0">
                        None
                      </MenuItem>
                      {permissionTypes.map((type) => (
                        <MenuItem value={type.name} key={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel
                    variant="outlined"
                    sx={{ fontSize: "11px", fontWeight: "bold" }}
                  >
                    Existing Groups
                  </InputLabel>
                  <Box
                    sx={{
                      width: { xl: 129, lg: 129, md: 129, sm: 129, xs: 220 },
                    }}
                  >
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={groupPermissionName}
                      sx={{
                        width: {
                          xl: "100%",
                          lg: "100%",
                          md: "100%",
                          sm: "100%",
                          xs: "100%",
                        },
                        height: 40,
                        mb: 1,
                        p: 1,
                        color: "black",
                        fontSize: "9px",
                      }}
                      label="Existing Groupsssss"
                      variant="outlined"
                      onChange={(e) => setGroupPermissionName(e.target.value)}
                    >
                      <MenuItem value="none" key="0">
                        None
                      </MenuItem>
                      {group_permissions.map((singleGroup) => (
                        <MenuItem
                          key={singleGroup.name}
                          value={singleGroup.name}
                        >
                          {singleGroup.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                </FormControl>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  sx={{
                    width: { xl: 120, lg: 120, md: 120, sm: 120, xs: 220 },
                    height: 40,
                    ml: { xs: 0, lg: 0, xl: 0, sm: 0, md: 0 },
                    mb: 3,
                    fontSize: 12,
                    color: "black",
                    borderColor: "lightgrey",
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  More Filters
                </Button>
              </Grid>
            </Box>
          </Grid>

          <Grid
            item
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            display="flex"
            flexDirection="row"
          >
            <Grid item container display="flex" flexDirection="column">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: {
                    xl: "row",
                    lg: "row",
                    md: "row",
                    sm: "row",
                    xs: "row",
                  },
                }}
              >
                <Grid item container>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    PERMISSION TYPE NAME OR ROLE NAME
                  </Typography>
                </Grid>
                <Grid
                  item
                  container
                  sx={{
                    justifyContent: {
                      xl: "flex-end",
                      lg: "flex-end",
                      md: "flex-end",
                      sm: "flex-end",
                      xs: "flex-end",
                    },
                    marginRight: "2em",
                    mt: "-10px",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      height: 40,
                      wdith: 40,

                      color: "black",
                      borderColor: "lightgrey",
                      px: 1,
                      mt: 1,
                      fontSize: 10,
                    }}
                  >
                    <Checkbox
                      onChange={(e: any, checked: boolean) => {
                        setIsSelectAllChecked(checked);
                        setFlag(1);
                      }}
                    />
                    Select All
                  </Button>
                </Grid>
              </Box>
              <Grid sx={{ mt: { lg: -4, xl: -4, md: -4, sm: -4 } }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {permissionsInfo
                    .filter((val: any) => {
                      if (searchTerm == "") {
                        return val;
                      } else if (
                        val.label
                          .toLowerCase()
                          .includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                    })
                    .map((data: any) => (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              onChange={permissionSelection}
                              checked={data.checked}
                              value={data.id}
                            />
                          }
                          label={data.label}
                        />
                      </div>
                    ))}
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
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
};

export default BasicModal;
