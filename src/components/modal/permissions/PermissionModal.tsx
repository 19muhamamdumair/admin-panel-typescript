import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SearchIcon from "@mui/icons-material/Search";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { alpha, styled } from "@mui/material/styles";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";
import InputBase from "@mui/material/InputBase";

import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

import Checkbox from "@mui/material/Checkbox";
import {
  Dialog,
  DialogActions,
  DialogTitle,
  Grid,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import {
  permission,
  permissionTypes,
  group_permissions,
} from "../../../data/Permission";
import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";
import Permissions from "../../../pages/Permissions";

const useStyles = makeStyles({
  root: {
    background: "green",
  },
  flow: {
    overflowX: "hidden",
  },
});
const BasicModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [age, setAge] = React.useState("");
  const [name, setName] = React.useState("");
  const [ischeckBoxChecked, setIscheckBoxChecked] = useState<boolean>(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  const [permissionsInfo, setPermissionsInfo] = useState<any>(permission);
  const [open, setOpen] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState("");
  const [groupPermissionName,setGroupPermissionName]=React.useState("")
const [flag,setFlag]=React.useState(0);
const [filterPermissionIds,setFilterPermissionIds]=useState<any>([])
const[allPermissionIds,setAllPermissionIds]=useState<any>({
  id:null,
  name:""
})
  const classes = useStyles();
  useEffect(()=>{
    permissionsInfo.map((p:any)=>{
      setAllPermissionIds({
        id:p.id,
        name:p.name
      })
    })
    console.log(allPermissionIds)
  },[])
  useEffect(() => {
    if(flag)
    {
      setPermissionsInfo(
        permissionsInfo.map((permission: any) => ({
          ...permission,
          checked: isSelectAllChecked,
        }))
      );
    }
    setFlag(1)
  }, [isSelectAllChecked]);
const handleSelectChange=(targetValue:any)=>{
  console.log("target value",targetValue)
  console.log("select value",selectValue)
  setGroupPermissionName(targetValue)
}
const filterPermission=()=>{
  console.log("filterPermission",group_permissions)
  let initialarr:any
  let newarr:any=[];

  if(groupPermissionName!=="")
  {
    group_permissions.map((singleGroup)=>{
      if(singleGroup.name===groupPermissionName)
      {
        singleGroup.permissions.map((singlePermission)=>{
          // console.log(singlePermission.permission_id),
          newarr.push(...filterPermissionIds,singlePermission.permission_id)
        })
      }
    })
    setFilterPermissionIds(newarr)
    // console.log(filterPermissionIds)
    console.log(filterPermissionIds)
  }
 
  // else
  {

  }
}
useEffect(()=>{
  console.log(filterPermissionIds)
},[])
  const permissionSelection = (event: any, checked: boolean) => {
    console.log(event, checked);
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

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        // color="inherit"
        color="success"
        // bgcolor="success"
        onClick={closeToaster}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(0),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      width: 370,
      height: 12,
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      // width: 'auto',
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const RedditTextField = styled((props: TextFieldProps) => (
    <TextField
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiFilledInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  const ValidationTextField = styled(TextField)({
    "& input:valid + fieldset": {
      borderColor: "green",
      borderWidth: 2,
    },
    "& input:invalid + fieldset": {
      borderColor: "red",
      borderWidth: 2,
    },
    "& input:valid:focus + fieldset": {
      borderLeftWidth: 6,
      padding: "4px !important", // override inline-style
    },
  });

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
          {" "}
          Permission Group Name
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
          <Grid item container direction={"column"} lg={12} xl={12}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Box sx={{ mt: 2, fontSize: 12, fontWeight: "bold" }}>
                Permissions Group Name
              </Box>
            </Grid>
            <Grid item xs={3} sm={3} md={6} lg={6} xl={6}>
              <FormControl
                sx={{ width: { xl: 370, lg: 370, md: 370, sm: 370, xs: 220 } }}
                variant="standard"
              >
                <InputLabel shrink htmlFor="bootstrap-input"></InputLabel>
                <BootstrapInput
                  placeholder="Permissions Group Name"
                  id="bootstrap-input"
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container direction={"column"}>
            <Grid item xs={6} md={6} lg={6} xl={6}>
              <Box sx={{ mt: 2, fontSize: 12, fontWeight: "bold" }}>
                Permissions Group Name
              </Box>
            </Grid>
            <Grid item xs={3} sm={3} md={6} lg={6} xl={6}>
              <FormControl
                sx={{ width: { xl: 370, lg: 370, md: 370, sm: 370, xs: 220 } }}
                variant="standard"
              >
                <InputLabel shrink htmlFor="bootstrap-input"></InputLabel>
                <BootstrapInput
                  placeholder="Permissions Group Name"
                  id="bootstrap-input"
                />
              </FormControl>
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
                      value={name}
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
                      }}
                      label="Permission"
                      onChange={(e) => setName(e.target.value)}
                    >
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
                      value={selectValue}
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
                      }}
                      label="Existing Gr"
                      variant="outlined"
                      // onChange={(e:any)=>handleSelectChange(e.target.value)}
                      onChange={(e) =>{ 
                        setGroupPermissionName(e.target.value)
                        filterPermission()
                      }}
                    >
                      {group_permissions.map((singleGroup) => (
                        <MenuItem key={singleGroup.name} value={singleGroup.name}>
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
                    fontSize: 9,
                    color: "black",
                    borderColor: "lightgrey",
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
                        setFlag(1)
                       
                      }}
                    />
                    Select All{" "}
                  </Button>
                </Grid>
              </Box>
              <Grid sx={{ mt: { lg: -4, xl: -4, md: -4, sm: -4 } }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {groupPermissionName && groupPermissionName!==""&&
                  permissionsInfo.map((data: any) => (
                    // <div>
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
                    // </div>
                  ))
                  }
                  
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
          // action={action}
          ContentProps={{
            classes: {
              root: classes.root,
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
