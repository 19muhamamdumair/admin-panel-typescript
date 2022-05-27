import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import Button from '@mui/material/Button';




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
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloseIcon from "@mui/icons-material/Close";

import Checkbox from "@mui/material/Checkbox";
import { Menu } from "antd";
import { IconButton, Snackbar, Typography } from "@mui/material";
import {permission} from '../../../data/Permission'

// import { makeStyles } from "@material-ui/";

const BasicModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [age, setAge] = React.useState('');
  const [name, setName] = React.useState('');
  const [ischeckBoxChecked, setIscheckBoxChecked] = useState<boolean>(false);
  const [isSelectAllChecked, setIsSelectAllChecked] = useState<boolean>(false);
  const [permissionsInfo, setPermissionsInfo] = useState<any>(permission);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setPermissionsInfo(permissionsInfo.map((permission: any) => ({ ...permission, checked: isSelectAllChecked })));
  }, [isSelectAllChecked])




  const permissionSelection = (event: any, checked: boolean) => {
    console.log(event, checked)
    permissionsInfo.map((permission: any, index: number) => {
      if (permission.id == event.target.value) {
        permissionsInfo[index].checked = !permission.checked
      }
    })

    setPermissionsInfo(permissionsInfo)
    setIscheckBoxChecked(!ischeckBoxChecked)
  }

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
        color="inherit"
        onClick={closeToaster}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );



  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const menu = (
    <Menu
        items={[
            {
                label: <a href="https://www.antgroup.com">1st menu item</a>,
                key: '0',
            },
            {
                label: <a href="https://www.aliyun.com">2nd menu item</a>,
                key: '1',
            },
            {
                type: 'divider',
            },
            {
                label: '3rd menu item',
                key: '3',
            },
        ]}
    />
);
const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(0),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        width: 370,
        height: 12,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        // width: 'auto',
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
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
    '& .MuiFilledInput-root': {
        border: '1px solid #e2e2e1',
        overflow: 'hidden',
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

const ValidationTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: 'green',
        borderWidth: 2,
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 6,
        padding: '4px !important', // override inline-style
    },
});

  return (
    <>
      <Button
        sx={{
          backgroundColor: "#47959e",
          color: 'white',
          fontSize: '13px',
          textTransform: 'none'
        }}
        variant="contained"
        onClick={showModal}

      >
        Create Permission Group
      </Button>
      <Modal title="Permission Group Name" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

        <Box sx={{ mt: 2, fontSize: 12, fontWeight: 'bold' }}>Permissions Group Name</Box>

        <FormControl sx={{ width: 370 }} variant="standard">
          <InputLabel shrink htmlFor="bootstrap-input">
          </InputLabel>
          <BootstrapInput placeholder="Permissions Group Name" id="bootstrap-input" />
        </FormControl>
        <Box sx={{ mt: 2, fontSize: 12, fontWeight: 'bold' }}>Filter Permission</Box>

        <FormControl sx={{ width: 370 }} variant="standard">
          <InputLabel placeholder="Filter by Permissions Name" shrink htmlFor="bootstrap-input">
          </InputLabel>
          <BootstrapInput id="bootstrap-input" placeholder='Filter by Permission Name' />
        </FormControl>


        <Box sx={{ display: 'flex', mt: 2, height: 20 }}>
          <FormControl >
            <InputLabel sx={{ fontSize: 11, fontWeight: 'bold' }} id="demo-simple-select-label">Existing</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={name}
              sx={{ width: 130, height: 40, mb: 3 }}
              label="Age"
              onChange={(e) => setName(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: 120 }}>
            <InputLabel sx={{ fontSize: 11, fontWeight: 'bold' }} id="demo-simple-select">Permission</InputLabel>
            <Select
              labelId="demo-simple-select"
              id="demo-simple-select"
              value={age}
              sx={{ width: 130, height: 40, mb: 3, p: 1 }}

              label="Age"
              onChange={(e) => setAge(e.target.value)}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" sx={{ width: 120, height: 40, ml: 1, mb: 3, fontSize: 9, color: "black", borderColor: "lightgrey" }}>More Filters</Button>

        </Box>
        <Box sx={{ display: "flex", mt: 4, mb: 0 }}>

          <Typography sx={{
            fontWeight: 'bold', alignItems: "center", justifyContent: "center", mt: 2, mb: 0, fontSize: 12
          }}>PERMISSION TYPE NAME OR ROLE NAME</Typography>


          <Button variant="outlined" sx={{ height: 40, ml: 10, color: "black", borderColor: 'lightgrey', px: 1, mt: 1, fontSize: 10 }}>
            <Checkbox onChange={(e: any, checked: boolean) => { setIsSelectAllChecked(checked) }} />  Select All </Button>

        </Box>
        {permissionsInfo.map((data: any) => (
          // <div> 
          <FormControlLabel control={<Checkbox onChange={permissionSelection} checked={data.checked} value={data.id} />} label={data.label} />
          // </div>
        ))}
      </Modal>
    </>
  );
};

export default BasicModal;
