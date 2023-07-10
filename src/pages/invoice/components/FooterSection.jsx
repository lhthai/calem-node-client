import React from "react";
import { View, Image, Text, StyleSheet } from "@react-pdf/renderer";
import assets from "assets";

const styles = StyleSheet.create({
  root: {
    width: "80%",
    marginHorizontal: "auto",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  column: {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "16px",
  },
  totalRow: {
    width: "100%",
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "40px",
  },
  headerCell: {
    padding: "6px 0 6px 6px",
    fontWeight: "bold",
  },
  bodyCell: {
    padding: "6px 0 6px 6px",
  },
});

const FooterSection = ({ order, totalQuantity }) => {
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <Image
          src={assets.images.qrCode}
          style={{ width: "150px", maxWidth: "30%" }}
        />
        <View style={styles.column}>
          <View style={styles.totalRow}>
            <Text>Tổng số ly:</Text>
            <Text>{totalQuantity()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tạm tính:</Text>
            <Text>{order.subTotal.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Phí ship:</Text>
            <Text>{order.shippingFee.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Giảm giá:</Text>
            <Text>{order.discountAmount.toLocaleString()}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Thành tiền:</Text>
            <Text>{order.total.toLocaleString()}</Text>
          </View>
        </View>
      </View>
      <View style={{ fontSize: "12px", textAlign: "center" }}>
        <Text>
          Trong cuộc sống có rất nhiều lựa chọn, cảm ơn quý khách hàng đã lựa
          chọn
        </Text>
        <Text
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            marginVertical: "4px",
            color: "#d94c16",
          }}
        >
          CÀ LEM FRESH JUICE
        </Text>
        <Text>Hẹn gặp lại quý khách !!!</Text>
      </View>
    </View>
  );
};

export default FooterSection;
