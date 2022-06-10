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
export default function RoleDropdown() {

  const [role, setRole] = useState<string>();



  return (
    // <Box  >
      
                <FormControl  sx={{borderRadius:'10em',width:"100%",mr:'10px',ml:{xl:0,lg:0,md:0,sm:0,xs:"10px"}
            
            }}>
                  <InputLabel
                    variant="outlined"
                    sx={{ fontSize: "11px", fontWeight: "bold" }}
                  >
                    Role
                  </InputLabel>
                 
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={role}
                      sx={{
                        width: {
                          xl: "100%",
                          lg: "100%",
                          md: "100%",
                          sm: "100%",
                          xs: "100%",
                         
                

                        },
                        height: 40,
                        borderRadius:{xl:"0 5px 5px 0",lg:"0 5px 5px 0",md:"0 5px 5px 0",sm:"0 5px 5px 0",xs:"5px 5px 5px 5px"},
                        mb: 1,
                        p: 1,
                        color: "black",
                        fontSize: "9px",
                      }}
                      label="User "
                      variant="outlined"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value="none" key="0">
                        None
                      </MenuItem>
                      
                    </Select>
                
                </FormControl>
           
    // </Box>
  );
}
