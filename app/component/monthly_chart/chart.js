import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import styles from "./chart.module.css";
import { get } from "../../api/base";

const MyMonthlyChartComponent = ({ selectedYear }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await get(
          `/dashboard/monthly_alerts/${selectedYear}/`
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]); // Re-fetch data when selectedYear changes

  useEffect(() => {
    if (chartData && typeof window !== "undefined") {
      const categories = chartData.map((item) => item.month.substring(0, 3)); // Shorten month names to 3 letters
      const smsData = chartData.map((item) => item.sms);
      const emailData = chartData.map((item) => item.email);
      const wordPressData = chartData.map((item) => item.word_press);

      const options2 = {
        series: [
          {
            name: "SMS",
            type: "area",
            data: smsData,
          },
          {
            name: "Email",
            type: "line",
            data: emailData,
          },
          {
            name: "WordPress",
            type: "line",
            data: wordPressData,
          },
        ],
        chart: { height: 280, type: "line", toolbar: { show: !1 } },
        stroke: { dashArray: [0, 8], width: [2, 2], curve: "smooth" },
        fill: {
          opacity: [1, 1],
          type: ["gradient", "solid"],
          gradient: {
            type: "vertical",
            inverseColors: !1,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 70],
          },
        },
        markers: { size: [0, 0, 0], strokeWidth: 2, hover: { size: 4 } },
        xaxis: {
          categories: categories,
          axisTicks: { show: !1 },
          axisBorder: { show: !1 },
        },
        yaxis: {
          min: 0,
          tickAmount: 4,
          labels: {
            formatter: function (e) {
              return e;
            },
            offsetX: -15,
          },
          axisBorder: { show: !1 },
        },
        grid: {
          show: !0,
          strokeDashArray: 3,
          xaxis: { lines: { show: !1 } },
          yaxis: { lines: { show: !0 } },
          padding: { top: -10, right: -2, bottom: -10, left: -5 },
        },
        legend: { show: !1 },
        colors: ["#7f56da", "#22c55e", "#ff4560"],
        tooltip: {
          shared: !0,
          y: [
            {
              formatter: function (e) {
                return Number(void 0 !== e ? e.toFixed(2) : "0");
              },
            },
            {
              formatter: function (e) {
                return Number(void 0 !== e ? e.toFixed(2) : "0");
              },
            },
            {
              formatter: function (e) {
                return Number(void 0 !== e ? e.toFixed(2) : "0");
              },
            },
          ],
        },
      };

      const chart1 = new ApexCharts(
        document.querySelector("#monthly_alert"),
        options2
      );
      chart1.render();

      return () => {
        if (chart1) {
          chart1.destroy();
        }
      };
    }
  }, [chartData]);

  return <div className={styles.chart} id="monthly_alert"></div>;
};

export default MyMonthlyChartComponent;

