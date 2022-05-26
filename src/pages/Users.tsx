import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import {useEffect} from "react"

const Users: FC<any> = (): ReactElement => {
  const getFavourites = () => {}
  useEffect(() => {
    
  }, [])

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
 
      <Typography variant="h3">User Page</Typography>
    </Box>
  );
};

export default Users;