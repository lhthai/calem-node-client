import React from "react";
import { useLocation } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {
  PDFViewer,
  Page,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import assets from "assets";
import { useGetOrderDetailQuery } from "state/api/orderDetailApi";
import HeaderSection from "./components/HeaderSection";
import TableSection from "./components/TableSection";
import FooterSection from "./components/FooterSection";

// Register Font
Font.register({
  family: "Roboto",
  fonts: [
    { src: assets.fonts.roboto },
    { src: assets.fonts.roboto_bold, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: "12px",
    marginHorizontal: "auto",
  },
});

const InvoicePage = () => {
  const location = useLocation();
  const order = location.state?.order;
  const { data: orderDetail = [], isLoading } = useGetOrderDetailQuery(
    order._id
  );

  const totalQuantity = () => {
    return orderDetail
      .map(({ quantity }) => quantity)
      .reduce((sum, i) => sum + i, 0);
  };

  if (isLoading) return <CircularProgress />;

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page wrap fixed style={styles.page}>
          <HeaderSection order={order} />
          <TableSection orderDetail={orderDetail || []} />
          <FooterSection order={order} totalQuantity={totalQuantity} />
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default InvoicePage;
