import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { group_Role } from "../../data/Role";


export default function RoleTable() {


  return (

      <TableContainer
        component={Paper}
      >
        <Table sx={{ }} aria-label="simple table">
          <TableBody>
            {group_Role.map((row: any) => (
              <TableRow key={row.name} sx={{ border: 0 }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                 <TableCell
                  sx={{
                    color: "#7480b2",
                    textDecoration: "underline",
                    textAlign: "center",
                    overflow: "hidden",
                  }}
                >
                  {row.permissions_group_id.length} Users
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
