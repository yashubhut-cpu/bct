import React, { useEffect } from "react";
import ApexCharts from "apexcharts";
import styles from "./chart.module.css";

const MyWeeklyChartComponent = ({ selectedWeek, data }) => {
  useEffect(() => {
    if (data && typeof window !== "undefined") {
      const categories = data.map((item) => item.day);
      const smsData = data.map((item) => item.sms);
      const emailData = data.map((item) => item.email);
      const wordPressData = data.map((item) => item.word_press);

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

      // Destroy existing chart if any
      const existingChart = document.querySelector("#weekly_alert");
      if (existingChart) {
        existingChart.innerHTML = "";
      }

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
  }, [data]); // Only depend on data prop

  return <div className={styles.chart} id="weekly_alert"></div>;
};

export default MyWeeklyChartComponent;
