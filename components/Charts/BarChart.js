import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function BarChart({ data }) {
  const [options, setOptions] = useState({
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
    colors: ["#FFB82C", "#00B65E", "#00CBCB", "#3F4CEC"],
    redrawOnParentResize: true,
    xaxis: {
      categories: [],
      labels: {
        trim: true,
        hideOverlappingLabels: false,
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
  });
  const [seriesData, setSeriesData] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (data) {
      console.log(data);
      let products = [];
      let availability_rating = [];
      let overall_rating = [];
      let quality_rating = [];
      let utility_rating = [];

      for (let i = 0; i < data.length; i++) {
        products.push(data[i].title);
        availability_rating.push(data[i].availability_rating);
        overall_rating.push(data[i].overall_rating);
        quality_rating.push(data[i].quality_rating);
        utility_rating.push(data[i].utility_rating);
      }

      let _options = { ...options };
      _options.xaxis.categories = products;

      let series_data = [
        {
          name: "Rating",
          data: overall_rating,
        },
        {
          name: "Qualtity",
          data: quality_rating,
        },
        {
          name: "Availability",
          data: availability_rating,
        },
        {
          name: "Utility",
          data: overall_rating,
        },
      ];
      setOptions(_options);
      setSeriesData(series_data);
    }
  }, [data]);
  return show ? (
    <Chart options={options} series={seriesData} type="bar" />
  ) : null;
}
