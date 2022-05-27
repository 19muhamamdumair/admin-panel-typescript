import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

function createData(name: string, permissions: string) {
  return { name, permissions };
}

const rows = [
  createData("Admin Permissions", "25 permissions "),
  createData("Admin Permissions", "25 permissions "),
  createData("Admin Permissions", "25 permissions "),
  createData("Admin Permissions", "25 permissions "),
  createData("Admin Permissions", "25 permissions "),
];
export default function PermissionsTable() {
  return (

      <TableContainer
        component={Paper}
      >
        <Table sx={{ }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
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
                  {row.permissions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  );
}
