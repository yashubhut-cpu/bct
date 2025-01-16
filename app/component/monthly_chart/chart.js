import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import styles from './chart.module.css';

const MyMonthlyChartComponent = () => {
  useEffect(() => {
    // Check if the code is running in the client-side (browser)
    if (typeof window !== 'undefined') {
      const options2 = {
        series: [
          {
            name: "Revenue",
            type: "area",
            data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
          },
          {
            name: "Expenses",
            type: "line",
            data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
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
          categories: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ],
          axisTicks: { show: !1 },
          axisBorder: { show: !1 },
        },
        yaxis: {
          min: 0,
          tickAmount: 4,
          labels: {
            formatter: function (e) {
              return e + "k";
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
        colors: ["#7f56da", "#22c55e"],
        tooltip: {
          shared: !0,
          y: [
            {
              formatter: function (e) {
                return void 0 !== e ? "$" + e.toFixed(2) + "k" : e;
              },
            },
            {
              formatter: function (e) {
                return void 0 !== e ? "$" + e.toFixed(2) + "k" : e;
              },
            },
          ],
        },
      };

      const chart1 = new ApexCharts(document.querySelector("#monthly_alert"), options2);
      chart1.render();

      // Cleanup function to destroy the chart when the component unmounts
      return () => {
        if (chart1) {
          chart1.destroy();
        }
      };
    }
  }, []); // Empty dependency array ensures this runs only once


  return <div className={styles.chart} id="monthly_alert"></div>;
};

export default MyMonthlyChartComponent;


