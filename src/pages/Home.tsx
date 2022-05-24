import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import {useEffect} from "react"

const Home: FC<any> = (): ReactElement => {
  const getFavourites = () => {}
useEffect(() => {
  localStorage.setItem("firstname", "Steve");
  localStorage.setItem("lastname", "Smith");
  localStorage.setItem("email", "staveadmin@gmail.com");
  localStorage.setItem("role", "admin");


  getFavourites()
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
      {/* <select className="form-select w-25" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select> */}
      <Typography variant="h3">User Page</Typography>
    </Box>
  );
};

export default Home;