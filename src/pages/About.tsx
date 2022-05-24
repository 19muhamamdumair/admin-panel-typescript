import React, { ReactElement, FC } from "react";
// import StickyHeadTable from "../components/RoleTable"
import { Box, Typography } from "@mui/material";


const About: FC<any> = (): ReactElement => {
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
      {/* <StickyHeadTable /> */}
      <Typography variant="h3">Role Page</Typography>
    </Box>
  );
};

export default About;