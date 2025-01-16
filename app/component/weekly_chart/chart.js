import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import styles from './chart.module.css';

const MyWeeklyChartComponent = () => {
  useEffect(() => {
    // Check if the code is running in the client-side (browser)
    if (typeof window !== 'undefined') {
      var options = {
        series: [{
        name: 'Net Profit',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }, {
        name: 'Revenue',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
      }, {
        name: 'Free Cash Flow',
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
      }],
        chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
      };

      var chart = new ApexCharts(document.querySelector("#weekly_alert"), options);
      chart.render();

      // Cleanup function to destroy the chart when the component unmounts
      return () => {
        if (chart) {
          chart.destroy();
        }
      };
    }
  }, []); // Empty dependency array ensures this runs only once


  return <div className={styles.chart} id="weekly_alert"></div>;
};

export default MyWeeklyChartComponent;


