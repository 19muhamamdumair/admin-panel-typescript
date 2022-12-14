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
import DeleteIcon from "@mui/icons-material/Delete";
import sort from "../../assets/Images/sort.png";
import {
  Avatar,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  IconButton,
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
import {
  DataGrid,
  GridCellValue,
  GridColDef,
  GridColumnHeaderParams,
  GridRowParams,
  GridValueGetterParams,
  GridValueSetterParams,
} from "@mui/x-data-grid";
import { user } from "../../data/Role";
import { useEffect } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@mui/styles";
import { group_Role } from "../../data/Role";
import Person from "@material-ui/icons/Person";
import { useMemo } from "react";
import ChipsArray, { ChipData as ChipDataType } from "./Tags";

export interface ChipData {
  key: number;
  label: string;
  category: string;
}
// import {chipData} from "./Tags";
let rowLength: any;
const useStyles = makeStyles({
  hideRightSeparator: {
    "& > .MuiDataGrid-columnSeparator": {
      visibility: "hidden",
      "& .MuiDataGrid-columnHeaderTitle": {
        backgroundColor: "black",
      },
    },
  },
  dropdownStyle: {
    "&.MuiSelect-select MuiSelect-outlined MuiOutlinedInput-input MuiInputBase-input css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
      {
        padding: "2.5px 14px",
      },
  },
  giveItemMargin: {
    "&.MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
      {
        marginLeft: "52px",
      },
  },
});

const UsersTable = React.memo(() => {
  const [originalData, setOriginalData] = useState<any>(user);
  const [userData, setUserData] = useState<any>(user);
  const [roles, setRoles] = useState<any>(group_Role);
  const [columns, setColumns] = useState<any>([]);
  const [rows, setRows] = useState<any>([]);
  const [navName, setNavName] = useState<any>(null);
  const [sortValue, setSortValue] = useState<any>("");
  const classes = useStyles();
  const [listLength, setListLength] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<any>([null]);
  const [deleteFlag, setDeleteFlag] = useState<any>(true);
  const randomColor = () => Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
  const [renderFlag, setRenderFlag] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<any>(null);
  const [roleFilterId, setRoleFilter] = useState<any>(null);
  const [changeDataFlag, setChangeDataFlag] = useState<any>(false);
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [FilterAgainFlag, setFilterAgainFlag] = useState<any>(false);
  const [chipData, setChipData] = useState<ChipDataType[]>([]);
  const [requestCounter, setRequestCounter] = useState<any>(0);
  const [userFilterName, setUserFilterName] = useState<any>("");
  const [chipFlag, setChipFlag] = useState<boolean>(false);
  const [userFilterData, setUserFilterData] = useState<any>(user);
  const [statusPrevData, setStatusPrevData] = useState<any>(user);

  //status colors
  const [data, setData] = useState<any>([
    {
      status: "Active",
      color: "#6ccca5 ",
      fontColor: "#00351f",
    },
    {
      status: "Suspended",
      color: "#ffc9c9",
      fontColor: "#db1a1a",
    },
    {
      status: "Pending",
      color: "#ffffc9",
      fontColor: "#919127",
    },
  ]);

  useEffect(() => {
    const FilterArray = {
      filterRoleId: 0,
      filterUserStatus: "",
      filterUserName: [],
    };
    let checkStepCount: any = 0,
      newFilterUsers: any = [];
    // debugger;
    chipData.map((filters: ChipDataType) => {
      if (filters.category === "Input") {
        if (!FilterArray.filterUserName.length) ++checkStepCount;

        (FilterArray.filterUserName as any).push(filters.value.toLowerCase());
      }
      if (filters.category === "Status" && filters.value != "All") {
        FilterArray.filterUserStatus = filters.value || "";
        ++checkStepCount;
      }
     
      if (filters.category === "Role" && filters.id) {
        FilterArray.filterRoleId = filters.id || 0;
        ++checkStepCount;
      }
    });

    // debugger

    originalData.map((userInfo: any, index: number) => {
      let checkStepsFulfilCount = 0;
      if (FilterArray.filterUserName.length) {
        if (
          userInfo.firstname.toLowerCase() ===
          FilterArray.filterUserName
            .filter(
              (username) =>
                username === userInfo.firstname.toLowerCase() || true
            )
            .find((username) => username === userInfo.firstname.toLowerCase())
        )
          ++checkStepsFulfilCount;
      }

      if (FilterArray.filterRoleId !== null && FilterArray.filterRoleId !== 0) {
        if (userInfo.roles.includes(FilterArray.filterRoleId)) {
          ++checkStepsFulfilCount;
        }
      }

      if (FilterArray.filterUserStatus !== "") {
        if (userInfo.status === FilterArray.filterUserStatus) {
          ++checkStepsFulfilCount;
        }
      }

      if (checkStepsFulfilCount === checkStepCount) {
        newFilterUsers.push(userInfo);
      }
    });

    setUserData([...newFilterUsers]);
    setChangeDataFlag(!changeDataFlag);
  }, [chipData]);

  //deleting filter by tag
  const handleDelete = (category: any, value: any, id?: any) => () => {
    setChipData([...chipData.filter((data: any) => data.value !== value)]);
    if(category==="Status")
    {
      setNavName("All")
    }
    else if(category==="Role")
    {
      setRoleFilter(0)
  
    }
   
  };

  //filter by role
  useEffect(() => {
    if (roleFilterId || roleFilterId == 0) {
      let roleChipFindFlag = false;
      let tmpChipData = [...chipData];

      let userRoleLabel =
        roles.find((role: any) => role.id === roleFilterId)?.name || "All";

      tmpChipData = tmpChipData.map((singleChipData: any, index: number) => {
        if (singleChipData.category === "Role") {
          singleChipData.value = userRoleLabel;
          singleChipData.id = roleFilterId;
          roleChipFindFlag = true;
        }
        return singleChipData;
      });

      if (!roleChipFindFlag) {
        tmpChipData.push({
          category: "Role",
          value: userRoleLabel,
          id: roleFilterId,
        });
      }
      setChipData([...tmpChipData]);
    }
  }, [roleFilterId]);

  //setting chipData if filter by nav name
  useEffect(() => {
    let roleChipFindFlag = false;
    let tmpChipData = [...chipData];

    if (navName) {
      tmpChipData = tmpChipData.map((singleChipData: any, index: number) => {
        if (singleChipData.category === "Status") {
          singleChipData.value = navName;
          roleChipFindFlag = true;
        }
        return singleChipData;
      });

      if (!roleChipFindFlag) {
        tmpChipData.push({
          category: "Status",
          value: navName,
        });
      }
      setChipData([...tmpChipData]);
    }
  }, [navName]);

  //setting rows
  useEffect(() => {
    let rowData: any = [];
    if (sortValue === "First name A-Z") {
      let tempArr = userData.sort((a: any, b: any) =>
        a.firstname.localeCompare(b.firstname)
      );
      setUserData(tempArr);
    } else if (sortValue === "First name Z-A") {
      let tempArr = userData.sort((a: any, b: any) =>
        b.firstname.localeCompare(a.firstName)
      );
      setUserData(tempArr);
    } else if (sortValue === "Last name A-Z") {
      let tempArr = userData.sort((a: any, b: any) =>
        a.lastname.localeCompare(b.lastname)
      );
      setUserData(tempArr);
    } else if (sortValue === "Last name Z-A") {
      let tempArr = userData.sort((a: any, b: any) =>
        b.lastname.localeCompare(a.lastname)
      );
      setUserData(tempArr);
    } else if (sortValue === "Status") {
      let tempArr = userData.sort((a: any, b: any) =>
        a.status.localeCompare(b.status)
      );
      setUserData(tempArr);
    }

    userData.map((user: any) => {
      let userRole = "";
      user.roles.find((f: any) => {
        userRole += roles
          .filter((singleRoleObject: any) => singleRoleObject.id === f)
          .map((selectedRole: any) => selectedRole.name + ", ");
      });
      userRole = userRole.substr(0, userRole.length - 2);

      rowData.push({
        id: user.id,
        avatar: "/broken-image.jpg",
        fullname: {
          fullname: user?.firstname + " " + user?.lastname,
          email: user.email,
        },
        status: user.status,
        role: userRole,
        firstName: user?.firstname,
        lastName: user?.lastname,

        randomColor: randomColor(),
      });
    });

    setRows(rowData);
    rowLength = rowData.length;
    setListLength(rowLength);
    setRenderFlag(!renderFlag);
  }, [sortValue, changeDataFlag]);

  function getStatus(params: GridValueGetterParams) {
    return `${params.row.status || ""} `;
  }

  //dropdown status
  function setStatus(params: GridValueSetterParams) {
    let value = params.value;
    let users: any = rows;
    users.map((row: any) => {
      if (params.row.id === row.id) {
        row.status = params.value;
        params.row.status = params.value;
      }
    });
    setRows(users);
    setRenderFlag(!renderFlag);
    userData.map((user: any) => {
      if (user.id === params.row.id) {
        user.status = params.value;
      }
    });
    setUserData(userData);

    return { ...params.row, value };
  }

  //setting columns
  let c: GridColDef[] = [];
  useEffect(() => {
    c = [
      {
        field: "avatar",
        sortable: false,
        disableColumnMenu: true,
        headerName: "Showing " + rowLength + " users",
        headerClassName: classes.hideRightSeparator,
        width: 70,
        renderCell: (params) => {
          return (
            <>
              <Avatar
                src={params.row.avatar}
                sx={{
                  position: "absolute",
                  bgcolor: "#" + params.row.randomColor,
                  "&.MuiDataGrid-columnHeaderTitle": {
                    position: "absolute",
                  },
                }}
              >
                {params.row?.firstName?.charAt(0)}
                {params.row?.lastName?.charAt(0)}
              </Avatar>
            </>
          );
        },
      },
      {
        field: "fullname",
        sortable: false,
        disableColumnMenu: true,
        headerName: "",
        headerClassName: classes.hideRightSeparator,
        width: 250,
        renderCell: (params) => (
          <div>
            <Typography>{params.row.fullname.fullname}</Typography>
            <Typography
              color="textSecondary"
              fontSize={"12px"}
              fontStyle={"italic"}
            >
              {params.row.fullname.email}
            </Typography>
          </div>
        ),
      },
      {
        field: "status",
        sortable: false,
        disableColumnMenu: true,
        headerName: "",
        headerClassName: classes.hideRightSeparator,
        width: 150,
        editable: true,
        valueSetter: setStatus,
        valueGetter: getStatus,

        type: "singleSelect",
        valueOptions: [
          { value: "Active", label: "Active" },
          { value: "Suspended", label: "Suspended" },
          { value: "Pending", label: "Pending" },
        ],

        renderCell: (params) => {
          let bColor: any;
          let fColor: any;
          data.map((f: any) => {
            if (f.status === params.row.status) {
              bColor = f.color;
              fColor = f.fontColor;
            }
          });

          return (
            <Box
              sx={{
                backgroundColor: bColor,
                color: fColor,
                borderRadius: "15px",
                padding: "5px 10px",
              }}
            >
              {params.row.status}
            </Box>
          );
        },
      },
      {
        field: "role",
        sortable: false,
        disableColumnMenu: true,
        headerName: "",
        headerClassName: classes.hideRightSeparator,
        width: 290,
      },
      {
        field: "delete",
        sortable: false,
        disableColumnMenu: true,
        headerName: "",
        headerClassName: classes.hideRightSeparator,
        width: 100,
      },
    ];
    setColumns(c);
  }, [sortValue, rowLength, renderFlag]);

  const requestSearch = (e: any) => {
    let dummyChipData = chipData;

    console.log(requestCounter);
    if (e.key === "Enter") {
      if (e.target.value == "") return;
      if (
        originalData.find(
          (user: any) => user.firstname.toLowerCase() === e.target.value
        )
      ) {
        if (
          dummyChipData.filter(
            (filterData) =>
              filterData.value?.toLowerCase() === e.target.value.toLowerCase()
          )?.length == 0
        ) {
          dummyChipData.push({
            category: "Input",
            value: e.target.value,
          });
        }
        setChipData([...dummyChipData]);
        setUserFilterName("");
      }
    }
  };

  //suspending users
  const suspendSelectedUsers = () => {
    let users: any = rows;
    selectedRows.map((selectedRowId: any) => {
      users.map((row: any) => {
        if (selectedRowId === row.id) {
          row.status = "Suspended";
        }
      });
    });
    {
      selectionModel.map((val: any) => <h1>{val}</h1>);
    }
    selectedRows.map((selectedRowId: any) => {
      userData.map((user: any) => {
        if (user.id === selectedRowId) {
          user.status = "Suspended";
        }
      });
    });
    setUserData(userData);
    setRows(users);
    setSelectionModel([]);
    setSelectedRows([null]);
    setRenderFlag(!renderFlag);
  };

  //deleting users
  const deleteSelectedUsers = () => {
    let rowData: any = rows;
    selectedRows.map((selectedRowId: any) => {
      rowData = rowData.filter((row: any) => selectedRowId !== row.id);
    });
    let deleteUser: any = userData;
    selectedRows.map((selectedRowId: any) => {
      deleteUser = deleteUser.filter((user: any) => selectedRowId !== user.id);
    });
    setUserData(deleteUser);
    setRows(rowData);
    rowLength = rowData.length;
  };

  //delete and suspend button flag
  useEffect(() => {
    if (selectedRows.length > 0 && selectedRows[0] !== null) {
      setDeleteFlag(false);
    } else {
      setDeleteFlag(true);
    }
  }, [selectedRows]);

  const sortByComponent = () => {
    return (
      <FormControl
        sx={{
          ml: "10px",
          mr: "10px",
          minWidth: 120,
          position: "absolute",
          right: 0,
          zIndex: 1,
        }}
        size="small"
      >
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
          <MenuItem value="Last name Z-A">Last name Z-A</MenuItem>
          <MenuItem value="First name A-Z">First name A-Z</MenuItem>
          <MenuItem value="First name Z-A">First name Z-A</MenuItem>
          <MenuItem value="Status">Status</MenuItem>
        </Select>
      </FormControl>
    );
  };

  return (
    <>
      <Grid
        xl={12}
        lg={12}
        md={12}
        sm={12}
        xs={12}
        container
        item
        component={Paper}
      >
        <UserNavbar setNavName={setNavName} navName={navName} />
        <Grid item container>
          <Grid container item xl={8} lg={8} md={8} sm={8} xs={12}>
            <TextField
              type={"search"}
              sx={{
                "& legend": { display: "none" },
                "& fieldset": { top: 0 },
                width: {
                  xl: "100%",
                  lg: "100%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                ml: "10px",
                mr: { xs: "10px", xl: 0, lg: 0, md: 0, sm: 0 },
                mt: { xs: 1, xl: 0, lg: 0, md: 0, sm: 0 },
                mb: { xs: 1, xl: 0, lg: 0, md: 0 },
              }}
              placeholder=" Filter users by name or tag"
              hiddenLabel
              id="filled-hidden-label-small"
              size="small"
              value={userFilterName}
              onChange={(e: any) => {
                setUserFilterName(e.target.value);
              }}
              onKeyPress={requestSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid container item xl={4} lg={4} md={4} sm={4} xs={12}>
            <Grid item container xl={6} lg={6} md={6} sm={6} xs={12}>
              <StatusDropdown statusFilter={statusFilter} />
            </Grid>
            <Grid item container xl={6} lg={6} md={6} sm={6} xs={12}>
              <RoleDropdown
                setRoleFilter={setRoleFilter}
                roleValue={roleFilterId}
              />
            </Grid>
          </Grid>
        </Grid>
        <ChipsArray handleDelete={handleDelete} chipData={chipData} />
        <Grid
          sx={{
            height: 400,
            display: "flex",
            justifyContent: "center",
            position: "relative",
            marginTop: { xl: 0, lg: 0, md: 0, sm: 0, xs: "39px" },
            // width: "100%",
          }}
          container
        >
          <Button
            onClick={suspendSelectedUsers}
            variant="outlined"
            disabled={deleteFlag}
            sx={{
              color: "red",
              border: "1px solid #e24d4d",
              position: "absolute",
              right: { xl: "236px", lg: "236px" },
              top: { xl: 0, lg: 0, md: "-32px", sm: "-32px", xs: "-32px" },
              left: {
                xl: "auto",
                lg: "auto",
                md: "13px",
                sm: "13px",
                xs: "13px",
              },
              zIndex: 1,
            }}
          >
            Suspend
          </Button>
          <IconButton
            onClick={deleteSelectedUsers}
            disabled={deleteFlag}
            sx={{
              color: "#e24d4d",

              position: "absolute",

              right: { xl: 180, lg: 180 },
              top: { xl: 0, lg: 0, md: "-32px", sm: "-32px", xs: "-32px" },
              left: {
                xl: "auto",
                lg: "auto",
                md: "133px",
                sm: "133px",
                xs: "133px",
              },
              zIndex: 1,
            }}
          >
            <DeleteIcon />
          </IconButton>
          {sortByComponent()}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowClassName={() => "paxton-table--row"}
            checkboxSelection
            disableSelectionOnClick
            selectionModel={selectionModel}
            onSelectionModelChange={(rows: any) => {
              setSelectedRows(rows);
              setSelectionModel(rows);

              setRenderFlag(!renderFlag);
            }}
            isRowSelectable={(params: GridRowParams) => params.row}
            sx={{
              "& .MuiDataGrid-columnHeaderTitle": {
                position: "absolute",
                fontWeight: "bold",
              },
              "&.MuiDataGrid-root .MuiDataGrid-iconSeparator": {
                display: "none",
              },
              "&.MuiDataGrid-root": {
                overflowY: "auto",
              },
              justifyContent: "center",
              width: "100%",
              borderTop: 0,
              overflow: "scroll",
              columnWidth: 100,
              scrolling: {
                columnRenderingMode: "virtual",
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
});
export default UsersTable;
