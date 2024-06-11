import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Star from "../assets/svg/star";
import Rate from "./rate";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Chart from "chart.js/auto";

const DynamicChart = dynamic(
  () => import("chart.js/auto").then((module) => module.Chart),
  {
    ssr: false,
  }
);

const CryptoTableRow = ({ prices }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !prices || prices.length === 0) return;

    const ctx = chartRef.current.getContext("2d");
    const sparklineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: prices.map((_, index) => index),
        datasets: [
          {
            data: prices,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      sparklineChart.destroy();
    };
  }, [prices]);

  return (
    <div>
      <canvas ref={chartRef} width={150} height={60} />
    </div>
  );
};

export default CryptoTableRow;
