import React, { useState } from "react";
import { CircularProgress, Grid } from "@mui/material";
import dayjs from "dayjs";
import FilterCard from "./components/FilterCard";
import Bestseller from "./components/Bestseller";
import RevenueChart from "./components/RevenueChart";
import AnalyticCard from "./components/AnalyticCard";
import PaidIcon from "@mui/icons-material/Paid";
import WineBarIcon from "@mui/icons-material/WineBar";
import { useGetRevenueQuery } from "state/api/analyticApi";
// import { useGetBestsellersQuery } from "state/api/analyticApi";

const OverviewPage = () => {
  const [fromDate, setFromDate] = useState(dayjs(Date.now()));
  const [toDate, setToDate] = useState(dayjs(Date.now()));

  const { data: revenue = [], isLoading } = useGetRevenueQuery({
    fromDate: dayjs(fromDate).format("YYYY-MM-DD"),
    toDate: dayjs(toDate).format("YYYY-MM-DD"),
  });
  // const { data: bestseller = [] } = useGetBestsellersQuery({
  //   fromDate: dayjs(fromDate).format("YYYY-MM-DD HH:mm:ss"),
  //   toDate: dayjs(toDate).format("YYYY-MM-DD HH:mm:ss"),
  // });

  const totalRevenue = () => {
    return revenue.map(({ revenue }) => revenue).reduce((sum, i) => sum + i, 0);
  };

  // const totalQuantity = () => {
  //   return bestseller.map(({ count }) => count).reduce((sum, i) => sum + i, 0);
  // };
  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={12}>
        <FilterCard
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
      </Grid>
      <Grid item md={3} xs={12}>
        <AnalyticCard
          title="Tổng doanh thu"
          value={totalRevenue().toLocaleString()}
          icon={<PaidIcon />}
          iconColor="success.main"
          subtitle={`trên tổng ${revenue.length} hóa đơn`}
        />
      </Grid>
      {/* <Grid item md={3} xs={12}>
        <AnalyticCard
          title="Tổng số ly"
          value={totalQuantity()}
          icon={<WineBarIcon />}
          iconColor="success.main"
          subtitle=""
        />
      </Grid> */}
      <Grid item md={8} xs={12}>
        <RevenueChart revenue={revenue} />
      </Grid>
      {/* <Grid item md={4} xs={12}>
        <Bestseller data={bestseller.slice(0, 10)} />
      </Grid> */}
    </Grid>
  );
};

export default OverviewPage;
