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
import {
  Avatar,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
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
import { useMemo } from "react";
const UsersTable = React.memo(() => {
  const [userData, setUserData] = useState<any>(user);
  const [roles, setRoles] = useState<any>(group_Role);
  const [c, setC] = useState<any>([{}]);
  const [rows, setRows] = useState<any>([]);
  const [navName, setNavName] = React.useState("all");
  const [checkBoxSelection,setCheckBoxSelection]=useState<boolean>(false)
 

  useEffect(() => {
    let rows: any = [];

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
          fullname: user?.firstname + " " + user?.lastname,
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
            fullname: user?.firstname + " " + user?.lastname,
            status: user.status,
            role: userRole,
            firstName: user?.firstname,
            lastName: user?.lastname,
          });
        }
      }
    });

    setRows(rows);
  }, [navName]);

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
      { field: "fullname", flex: 1 },
      {
        field: "status",
        flex: 1,
        renderCell: (params) => {
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
              </Box>
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
        <FormGroup sx={{ml:2,mb:-2}}>
            <FormControlLabel control={<Checkbox onChange={()=>setCheckBoxSelection(!checkBoxSelection)}/>} label={<Typography sx={{fontWeight:'bold',color:'grey',fontSize:'12px'}}>Showing 50 users</Typography>} />
          </FormGroup>
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
          
           
            
            headerHeight={0}
            sx={{
              "& .css-f3jnds-MuiDataGrid-columnHeaders": { mt: "-17px" },
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
