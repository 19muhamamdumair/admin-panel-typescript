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
import { Avatar, Grid, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StatusDropdown from "./UserStatusDropdown";
import RoleDropdown from "./RoleDropdown";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { user } from "../../data/Role";
import { useEffect } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { group_Role } from "../../data/Role";

export default function UsersTable() {
  const [userData, setUserData] = useState<any>(user);
  const [roles, setRoles] = useState<any>(group_Role);
  const [flag, setFlag] = useState<any>(0);
  const [r, setR] = useState<any>([{}]);
  const [c, setC] = useState<any>([{}]);
  const [groupData, setGroupData] = useState<any>([{}]);
  
  let rows: any = [];
  
 const setRowData:any=()=>{
  //  if(flag===1)
   {
    roles.map((role: any) => {
      userData.map((user: any) => {
        user.roles.find((f: any) => {
          if (f === role.id) {
            rows = [
              ...rows,
              {
                id: user.id,
                avatar: "/broken-image.jpg",
                fullname: user?.firstname + " " + user?.lastname,
                status: user.status,
                role: role.name,
                firstName: user?.firstname,
                lastName: user?.lastname,
              },
            ];
          }
        });
      });
    });
  
   }
    return rows
 }


  //   userData.map((user: any) => {
  //     rows = [...rows,
  //       {
  //         id: user.id,
  //         avatar: "/broken-image.jpg",
  //         fullname: user?.firstname + " " + user?.lastname,
  //         status: user.status,
  //         role: "Admin",
  //         firstName: user?.firstname,
  //         lastName: user?.lastname,
  //       },
  //     ];
  //     // console.log(rows)
  //   });
  const requestSearch = () => {
    // const filteredRows = originalRows.filter((row) => {
    //   return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    // });
    // setRows(filteredRows);
  };
  
  let columns: GridColDef[]=[] 
  const setColumnsData:any=()=>{
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
   return columns
  }
  let rdata:any=r
  useEffect(() => {
    let cdata=setColumnsData()
    setC(cdata)
    rdata=setRowData()
    setR(rdata)
    console.log("data",cdata)
    console.log("data",rdata)
    console.log("r",r)
  console.log(setColumnsData())
  console.log(setRowData())
  setFlag(1)
  console.log(flag)
  }, []);
  useEffect(()=>{
    setFlag(2)
  },[])

  return (
    <>
   
      <Grid sx={{ width: "100%" }} container item component={Paper}>
       
        <UserNavbar />

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
            rows={setRowData()}
            columns={c}
         
            pageSize={10}
            rowsPerPageOptions={[10]}
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
}
