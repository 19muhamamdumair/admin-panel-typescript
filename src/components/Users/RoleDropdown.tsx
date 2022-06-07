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
    <Box  >
      <Grid item>
                <FormControl  sx={{borderRadius:'10em'
            
            }}>
                  <InputLabel
                    variant="outlined"
                    sx={{ fontSize: "11px", fontWeight: "bold" }}
                  >
                    Role
                  </InputLabel>
                  <Box
                    sx={{
                      width: { xl: 129, lg: 129, md: 129, sm: 129, xs: 220 },
                    }}
                  >
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
                         
                        // backgroundColor:'black',
                        borderRadius:"0 5px 5px 0"
                        },
                        height: 40,
                        mb: 1,
                        p: 1,
                        color: "black",
                        fontSize: "9px",
                      }}
                      label="User S"
                      variant="outlined"
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value="none" key="0">
                        None
                      </MenuItem>
                      
                    </Select>
                  </Box>
                </FormControl>
              </Grid>
    </Box>
  );
}
