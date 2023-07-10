import React from "react";
import { Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import assets from "assets";
import { formatDatetime } from "utils";

const styles = StyleSheet.create({
  root: {
    width: "80%",
    marginHorizontal: "auto",
  },
  logo: {
    width: "140px",
    height: "140px",
  },
  storeInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  storeName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#d94c16",
    textTransform: "uppercase",
    marginBottom: "4px",
  },
  orderNo: {
    fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "4px",
  },
  orderInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginVertical: "4px",
    gap: "4px",
  },
});

const HeaderSection = ({ order }) => {
  return (
    <View style={styles.root}>
      <View style={styles.storeInfo}>
        <Image src={assets.images.logo} style={styles.logo} />
        <View style={{ maxWidth: "65%" }}>
          <Text style={styles.storeName}>Cà Lem Fresh Juice</Text>
          <Text style={{ marginVertical: "4px" }}>
            Địa chỉ: 1119 đường Hùng Vương, ấp 5, xã Long Thọ, huyện Nhơn Trạch,
            tỉnh Đồng Nai
          </Text>
          <Text>Điện thoại/Zalo: 0945 404 504</Text>
        </View>
      </View>
      <Text render={() => `Hóa đơn`} style={styles.orderNo} />
      <View style={styles.orderInfo}>
        <Text>
          Khách hàng: {order.customerName}
          {order.phone !== "" ? ` - ${order.phone}` : ""}
        </Text>
        <Text>Ngày đặt: {order.orderDate.substring(0, 10)}</Text>
      </View>
      <Text style={{ marginVertical: "4px" }}>
        Địa chỉ giao hàng: {order.address}
      </Text>
    </View>
  );
};

export default HeaderSection;
