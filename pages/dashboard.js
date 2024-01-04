import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Header from "../components/Header/Header";
import { Grid, Box, CircularProgress, Typography, Button } from "@mui/material";
import { axiosRequest } from "../components/api/api";
import { useRouter } from "next/router";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const productsEndpoint = `8005/overall_rating`;

const Dashboard = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loader, setLoader] = useState(true);
  const router = useRouter();
  const [overallRating, setOverallRating] = useState({
    proudctsName: [],
    proudctsQualityRating: [],
    proudctsUtilityRating: [],
    proudctsAvailabilityRating: [],
    proudctsOverallRating: [],
  });
  useEffect(() => {
    getOverallRating();
  }, []);

  async function getOverallRating() {
    try {
      const response = await axiosRequest(
        "get",
        ///give router path here////
        undefined,
        undefined
      );

      const _overAllRating = {};
      _overAllRating.proudctsName = response.data.map(
        (product) => product.title
      );
      _overAllRating.proudctsQualityRating = response.data.map(
        (product) => product.quality_rating
      );
      _overAllRating.proudctsUtilityRating = response.data.map(
        (product) => product.utility_rating
      );
      _overAllRating.proudctsAvailabilityRating = response.data.map(
        (product) => product.availability_rating
      );
      _overAllRating.proudctsOverallRating = response.data.map(
        (product) => product.overall_rating
      );
      //////////set state here//////////
      setLoader(false);
    } catch (error) {
      alert("Something went wrong please try again later.");
    }
  }
  const columnChartOptions = {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    title: {
      text: "Overall Rating",
      align: "left",
    },
    colors: ["#00B65E", "#00CBCB", "#3F4CEC"],
    xaxis: {
      categories: overallRating.proudctsName,
      labels: {
        rotateAlways: true,
        hideOverlappingLabels: false,
        trim: true,
      },
    },
    yaxis: {
      title: {},
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {},
    },
  };
  const lineChartOptions1 = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [2],
    },
    markers: {
      colors: "#FFFFFF",
      strokeColors: "#3F4CEC",
      size: 5,
    },
    title: {
      text: "Product Utility",
      align: "left",
    },
    colors: ["#3F4CEC"],
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: overallRating.proudctsName,
      labels: {
        rotateAlways: true,
        trim: true,
        hideOverlappingLabels: false,
      },
    },
    tooltip: {
      y: {},
    },
  };
  const lineChartOptions2 = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: [2],
    },
    markers: {
      colors: "#FFFFFF",
      strokeColors: "#00B65E",
      size: 5,
    },
    title: {
      text: "Product Availability",
      align: "left",
    },
    colors: ["#00B65E"],
    grid: {
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: overallRating.proudctsName,
      labels: {
        rotateAlways: true,
        hideOverlappingLabels: false,
        trim: true,
      },
    },
  };
  const columnChartSeries = [
    {
      name: "Qualtity",
      data: overallRating?.proudctsQualityRating,
    },
    {
      name: "Availability",
      data: overallRating?.proudctsAvailabilityRating,
    },
    {
      name: "Utility",
      data: overallRating?.proudctsUtilityRating,
    },
  ];
  const lineChartSeries1 = [
    {
      name: "Product Utility",
      data: overallRating?.proudctsUtilityRating,
    },
  ];
  const lineChartSeries2 = [
    {
      name: "Product Availability",
      data: overallRating?.proudctsAvailabilityRating,
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h6"
            paddingBottom={1}
            sx={{ fontWeight: "600", p: 2 }}
          >
            {"Dashboard"}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} marginTop={1}>
          <Button
            variant="contained"
            sx={{
              background: "green",
              color: "white",
              borderColor: "green",
              "&.MuiButton-root:hover": {
                background: "green",
                color: "white",
                borderColor: "green",
              },
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
        </Grid>
      </Box>
      {loader ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
          <CircularProgress sx={{ color: "#00B65E" }} />
        </Box>
      ) : (
        <Grid container>
          <Grid item xs={12} paddingBottom={5} sx={{}}>
            <Chart
              options={columnChartOptions}
              series={columnChartSeries}
              type="bar"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Chart
              options={lineChartOptions1}
              series={lineChartSeries1}
              type="bar"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Chart
              options={lineChartOptions2}
              series={lineChartSeries2}
              type="bar"
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
