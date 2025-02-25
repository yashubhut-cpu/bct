import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import styles from "./chart.module.css";
import { get } from "../../api/base";

const MyWeeklyChartComponent = ({ selectedWeek, data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(
          `/dashboard/weekday_alerts/${selectedWeek}/`
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching weekly alert data:", error);
      }
    };

    fetchData();
  }, [selectedWeek]);

  useEffect(() => {
    if (chartData && typeof window !== "undefined") {
      const categories = chartData.map((item) => item.day);
      const smsData = chartData.map((item) => item.sms);
      const emailData = chartData.map((item) => item.email);
      const wordPressData = chartData.map((item) => item.word_press);

      const options = {
        series: [
          {
            name: "SMS",
            data: smsData,
          },
          {
            name: "Email",
            data: emailData,
          },
          {
            name: "WordPress",
            data: wordPressData,
          },
        ],
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            borderRadius: 5,
            borderRadiusApplication: "end",
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
        xaxis: {
          categories: categories,
        },
        yaxis: {
          title: {
            text: "Count",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val + " counts";
            },
          },
        },
      };

      const chart = new ApexCharts(
        document.querySelector("#weekly_alert"),
        options
      );
      chart.render();

      return () => {
        if (chart) {
          chart.destroy();
        }
      };
    }
  }, [chartData]);

  return <div className={styles.chart} id="weekly_alert"></div>;
};

export default MyWeeklyChartComponent;
