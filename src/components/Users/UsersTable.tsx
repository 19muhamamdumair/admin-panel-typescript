import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { group_permissions } from "../../data/Permission";
import UserNavbar from "./UserNavbar";
import SearchBar from "material-ui-search-bar";
import { useState } from "react";
import sort from "../../assets/Images/sort.png";
import {
  Avatar,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StatusDropdown from "./UserStatusDropdown";
import RoleDropdown from "./RoleDropdown";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { user } from "../../data/Role";
import { useEffect } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { group_Role } from "../../data/Role";
import Person from "@material-ui/icons/Person";
import { useMemo } from "react";

const useStyles = makeStyles({
  hideRightSeparator: {
    // '& .MuiDataGrid-columnHeaderTitle': {
    //     visibility: 'hidden',
    // },
    // '&.MuiDataGrid-root .MuiDataGrid-iconSeparator':{
    //   visibility: 'hidden',
    // }
  },
  giveItemMargin: {
    "&.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
      {
        marginLeft: "52px",
      },
  },
});
const UsersTable = React.memo(() => {
  const [userData, setUserData] = useState<any>(user);
  const [roles, setRoles] = useState<any>(group_Role);
  const [c, setC] = useState<any>([{}]);
  const [rows, setRows] = useState<any>([]);
  const [navName, setNavName] = React.useState("all");
  const [checkBoxSelection, setCheckBoxSelection] = useState<boolean>(false);
  const [sortValue, setSortValue] = useState<any>("");

  const classes = useStyles();

  useEffect(() => {
    let rows: any = [];
    if(sortValue==="First name A-Z")
    {
      let tempArr=userData.sort((a:any, b:any) => a.firstname.localeCompare(b.firstname))
      setUserData(tempArr)
    }
    else if (sortValue==="First name Z-A")
    {
      let tempArr=userData.sort((a:any, b:any) => b.firstname.localeCompare(a.firstName))
      setUserData(tempArr)
    } 
    else if (sortValue==="Last name A-Z")
    {
      let tempArr=userData.sort((a:any, b:any) => a.lastname.localeCompare(b.lastname))
      setUserData(tempArr)
    }
    else if (sortValue==="Last name Z-A")
    {
      let tempArr=userData.sort((a:any, b:any) => b.lastname.localeCompare(a.lastname))
      setUserData(tempArr)
    }
    else if(sortValue==="Status")
    {
      let tempArr=userData.sort((a:any, b:any) => a.status.localeCompare(b.status))
      setUserData(tempArr)
    }

    userData.map((user: any) => {
      let userRole = "";
      user.roles.find((f: any) => {
        userRole += roles
          .filter((singleRoleObject: any) => singleRoleObject.id === f)
          .map((selectedRole: any) => selectedRole.name);
      });
      if (navName === "all") {
        rows.push({
          id: user.id,
          avatar: "/broken-image.jpg",
          fullname: {fullname:user?.firstname + " " + user?.lastname,email:user.email},
          status: user.status,
          role: userRole,
          firstName: user?.firstname,
          lastName: user?.lastname,
        });
      } else {
        // console.log(navName, user.status);
        if (navName === user.status) {
          rows.push({
            id: user.id,
            avatar: "/broken-image.jpg",
            fullname: {fullname:user?.firstname + " " + user?.lastname,email:user.email},
            status: user.status,
            role: userRole,
            firstName: user?.firstname,
            lastName: user?.lastname,
          });
        }
      }
    });

    setRows(rows);
    // debugger

  }, [navName,sortValue]);
  useEffect(()=>{
    // debugger
console.log(sortValue)
// debugger
if(sortValue==="First name")
{

}
console.log(rows)
  },[sortValue,navName])

  const requestSearch = () => {
    // const filteredRows = originalRows.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setRows(filteredRows);
  };

  let columns: GridColDef[] = [];
  const setColumnsData: any = () => {
    // setFlag(1)
    columns = [
      {
        field: "avatar",
        flex: 0,
        renderCell: (params) => {
          return (
            <>
              <Avatar src={params.row.avatar}>
                {params.row?.firstName?.charAt(0)}
                {params.row?.lastName?.charAt(0)}
              </Avatar>
            </>
          );
        },
      },
      { field: "fullname", flex: 1,
      renderCell: (params) => (
        <div>
          <Typography>{params.row.fullname.fullname}</Typography>
          <Typography color="textSecondary" fontSize={"12px"} fontStyle={"italic"}>{params.row.fullname.email}</Typography>
        </div>
      )
    },
      {
        field: "status",
        flex: 1,
        renderCell: (params) => {
          // debugger
          return (
            <>
               <Box
                sx={{
                  border: "1px solid #c2eab6",
                  backgroundColor: "#c2eab6",
                  borderRadius: "15px",
                  padding: "4px",
                }}
              >
                {params.row.status}
              </ Box>
              
            </>
          );
        },
      },
      {
        field: "role",
        flex: 0,
      },
    ];
    return columns;
  };

  useEffect(() => {
    let cdata = setColumnsData();
    setC(cdata);
  }, []);

  return (
    <>
      <Grid sx={{ width: "100%" }} container item component={Paper}>
        <UserNavbar setNavName={setNavName} />

        <TextField
          type={"search"}
          sx={{
            "& legend": { display: "none" },
            "& fieldset": { top: 0 },
            width: { xl: "70%", lg: "70%", md: 370, sm: 370, xs: 220 },
            ml: "10px",
            mt: "0",
          }}
          placeholder=" Filter users by name or tag"
          hiddenLabel
          id="filled-hidden-label-small"
          size="small"
          onChange={requestSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <StatusDropdown />

        <RoleDropdown />
        <Grid item container justifyContent={"end"}>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
              displayEmpty
              inputProps={{
                "aria-label": "Without label",
                style: { position: "absolute" },
              }}
              IconComponent={() => {
                return (
                  <>
                    <Typography
                      sx={{
                        marginRight: "48px",
                        position: "absolute",
                        marginLeft: 1,
                        fontSize: "12px",
                        color: "#848383",
                      }}
                    >
                      Sort by
                    </Typography>
                    <Box
                      component="img"
                      src={sort}
                      sx={{ wdith: "10px", height: "10px", mr: "10px" }}
                    />
                  </>
                );
              }}
              SelectDisplayProps={{
                style: {
                  marginLeft: "37px",
                  paddingRight: "7px",
                  fontSize: "12px",
                },
              }}
            >
              <MenuItem sx={{ display: "none" }} value="">
                Last name A-Z
              </MenuItem>
              
              <MenuItem value="Last name A-Z">Last name A-Z</MenuItem>
              <MenuItem  value="Last name Z-A">
                Last name Z-A
              </MenuItem>
              <MenuItem value={"First name A-Z"}>First name A-Z</MenuItem>
              <MenuItem value={"First name Z-A"}>First name Z-A</MenuItem>
              <MenuItem value={"Status"}>Status</MenuItem>
             
            </Select>
          </FormControl>
        </Grid>
        {/* <Typography sx={{fontWeight:'bold',color:'grey',fontSize:'12px',position:'absolute',top:"26em",left:'28em'}}>Showing 50 users</Typography> */}
        {/* <FormGroup sx={{ml:2,mb:-2}}>
            <FormControlLabel control={<Checkbox onChange={()=>setCheckBoxSelection(!checkBoxSelection)}/>} label={<Typography sx={{fontWeight:'bold',color:'grey',fontSize:'12px'}}>Showing 50 users</Typography>} />
          </FormGroup> */}
        <Grid
          sx={{
            height: 400,
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
          container
        >
          <DataGrid
            rows={rows}
            columns={c}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowClassName={() => "paxton-table--row"}
            checkboxSelection
            className={classes.hideRightSeparator}
            // headerHeight={0}
            sx={{
              "& .css-f3jnds-MuiDataGrid-columnHeaders": {
                position: "absolute",
                top: -2,
              },
              justifyContent: "center",
              width: "100%",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
});
export default UsersTable;
