import React, { ReactElement, FC } from "react";
import { Box, Typography } from "@mui/material";
import App from "../components/modal/permissions/Modal"
import Drawer from "../components/Drawer"


const Permissions: FC<any> = (): ReactElement => {
  return (
    <>
    <div className="drawer-index">
            <Drawer />
            </div>

   <div className="container">
     <div className="row">
       <div className="col-6 mx-auto box-index mt-5">
         <App />

       </div>

     </div>

   </div>
   </>
  );
};

export default Permissions;