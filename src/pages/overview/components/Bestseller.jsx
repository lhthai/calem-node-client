import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Divider,
} from "@mui/material";

const Bestseller = ({ data }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardHeader title="Top 10 best seller" />
      <Divider />
      <CardContent>
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Món</TableCell>
              <TableCell>Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Bestseller;
