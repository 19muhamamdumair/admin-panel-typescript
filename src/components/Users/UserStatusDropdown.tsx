import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box, Grid, InputLabel, Select, Typography } from '@mui/material';
import getLocalStorageServices from "../../services/local-storage.service"
import { useState } from 'react';
import { useEffect } from 'react';
import IUser from "../../types/user.type";
import FormControl from "@mui/material/FormControl";
export default function StatusDropdown() {
  const [userStatus, setUserStatus] = useState<string>();


  


  return (
    // <Box sx={{ml:'5px',}} >
    
                <FormControl sx={{width:'100%',ml:{xs:"10px"},mr:{xl:0,lg:0,md:0,sm:0,xs:"10px"}}}>
                  <InputLabel
                    variant="outlined"
                    sx={{ fontSize: "11px", fontWeight: "bold" }}
                  >
                    User Status
                  </InputLabel>
                 
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={userStatus}
                      sx={{
                        width: {
                          xl: "100%",
                          lg: "100%",
                          md: "100%",
                          sm: "100%",
                          xs: "100%",
                          
                        },
                        borderRadius:{xl:"5px 0 0 5px",lg:"5px 0 0 5px",md:"5px 0 0 5px",sm:"5px 0 0 5px",xs:"5px 5px 5px 5px"},
                        height: 40,
                        mb: 1,
                        p: 1,
                        color: "black",
                        fontSize: "9px",
                      }}
                      label="User Statusss"
                      variant="outlined"
                      onChange={(e) => setUserStatus(e.target.value)}
                    >
                      <MenuItem value="none" key="0">
                        None
                      </MenuItem>
                      
                    </Select>
                  
                </FormControl>
              
    // </Box>
  );
}
