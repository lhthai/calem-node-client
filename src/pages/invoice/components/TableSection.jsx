import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableBody,
  TableCell,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const styles = StyleSheet.create({
  root: {
    width: "80%",
    marginHorizontal: "auto",
    fontSize: "12px",
  },
  headerCell: {
    padding: "6px 0 6px 6px",
    fontWeight: "bold",
  },
  bodyCell: {
    padding: "6px 0 6px 6px",
  },
});
const TableSection = ({ orderDetail }) => {
  return (
    <View style={styles.root}>
      <Table data={orderDetail}>
        <TableHeader textAlign="center" fontSize="12px">
          <TableCell style={styles.headerCell}>Món</TableCell>
          <TableCell weighting={0.25} style={styles.headerCell}>
            Giá
          </TableCell>
          <TableCell weighting={0.25} style={styles.headerCell}>
            Số lượng
          </TableCell>
          <TableCell style={styles.headerCell} weighting={0.3}>
            Thành tiền
          </TableCell>
        </TableHeader>
        <TableBody>
          <DataTableCell
            fontSize="12px"
            style={styles.bodyCell}
            getContent={(r) => r.productName}
          />
          <DataTableCell
            fontSize="12px"
            style={[styles.bodyCell, { textAlign: "center" }]}
            weighting={0.25}
            getContent={(r) => r.price.toLocaleString()}
          />
          <DataTableCell
            fontSize="12px"
            style={[styles.bodyCell, { textAlign: "center" }]}
            weighting={0.25}
            getContent={(r) => r.quantity}
          />
          <DataTableCell
            fontSize="12px"
            weighting={0.3}
            style={[styles.bodyCell, { textAlign: "center" }]}
            getContent={(r) => (r.price * r.quantity).toLocaleString()}
          />
        </TableBody>
      </Table>
    </View>
  );
};

export default TableSection;
