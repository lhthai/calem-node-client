import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  useTheme,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Bar } from "react-chartjs-2";

const RevenueChart = ({ revenue }) => {
  const theme = useTheme();
  const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
    defaultMatches: true,
    noSsr: false,
  });
  let data = [];
  revenue.reduce((x, value) => {
    if (!x[value._id]) {
      x[value._id] = { _id: value._id, revenue: 0 };
      data.push(x[value._id]);
    }
    x[value._id].revenue += value.revenue;
    return x;
  }, {});

  const options = {
    indexAxis: smUp ? "" : "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          color: theme.palette.mode === "light" ? "black" : "#FFFFFF",
        },
      },
      x: {
        ticks: {
          color: theme.palette.mode === "light" ? "black" : "#FFFFFF",
        },
      },
    },
    plugins: {
      datalabels: {
        display: true,
        color: "white",
        anchor: "end",
        offset: smUp ? -20 : 0,
        align: "start",
      },
      legend: {
        labels: {
          color: theme.palette.mode === "light" ? "black" : "#FFFFFF",
        },
      },
    },
  };

  const chartData = {
    labels: data.map(({ _id }) => _id),
    datasets: [
      {
        label: "Doanh thu",
        data: data.map(({ revenue }) => revenue),
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  return (
    <Card sx={{ height: "100%" }}>
      <CardHeader title="Doanh thu theo ngày" />
      <Divider />
      <CardContent>
        <Bar data={chartData} options={options} />
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
