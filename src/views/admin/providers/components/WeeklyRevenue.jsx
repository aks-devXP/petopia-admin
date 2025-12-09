import React, { useMemo, useState } from "react";
import Card from "components/card";
import BarChart from "components/charts/BarChart";
import { MdBarChart } from "react-icons/md";

// Dummy monthly data (replace with API later)
const MONTHLY_PROVIDER_DATA = {
  2024: {
    veterinary: {
      total: [40, 52, 63, 74, 80, 88, 95, 103, 110, 118, 125, 132],
      added: [40, 12, 11, 11, 6, 8, 7, 8, 7, 8, 7, 7],
    },
    groomer: {
      total: [20, 24, 28, 32, 35, 38, 41, 44, 47, 50, 53, 56],
      added: [20, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3],
    },
    trainer: {
      total: [15, 18, 20, 23, 25, 27, 29, 32, 34, 36, 38, 40],
      added: [15, 3, 2, 3, 2, 2, 2, 3, 2, 2, 2, 2],
    },
  },
  2025: {
    veterinary: {
      total: [140, 148, 157, 166, 176, 186, 196, 205, 215, 225, 235, 245],
      added: [8, 8, 9, 9, 10, 10, 10, 9, 10, 10, 10, 10],
    },
    groomer: {
      total: [58, 61, 64, 68, 72, 76, 80, 84, 88, 92, 96, 100],
      added: [2, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    },
    trainer: {
      total: [42, 44, 46, 49, 51, 53, 55, 57, 59, 61, 63, 65],
      added: [2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2],
    },
  },
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const providerTypes = [
  { value: "veterinary", label: "Veterinary" },
  { value: "groomer", label: "Groomer" },
  { value: "trainer", label: "Trainer" },
];

const years = [2024, 2025];

const ProviderChart = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedType, setSelectedType] = useState("veterinary");

const { chartData, chartOptions } = useMemo(() => {
  const yearData = MONTHLY_PROVIDER_DATA[selectedYear]?.[selectedType] || {
    total: new Array(12).fill(0),
    added: new Array(12).fill(0),
  };

  const existing = yearData.total.map((t, i) =>
    Math.max(0, t - (yearData.added[i] || 0))
  );
  const added = yearData.added;

  const data = [
    {
      name: "Existing Providers",
      data: existing,
    },
    {
      name: "New Providers",
      data: added,
    },
  ];

  const options = {
    chart: {
      stacked: true,
      toolbar: { show: false },
      foreColor: "#94a3b8",
    },
    colors: ["#22d3ee", "#3b82f6"], // cyan = existing, blue = new
    grid: {
      show: true,
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      labels: { colors: "#64748b" },
    },
    xaxis: {
      categories: MONTH_LABELS,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#94a3b8",
          fontSize: "12px",
        },
      },
    },
    tooltip: {
      shared: true,
      intersect: false,          // ✅ this fixes the runtime error
      theme: "dark",
      y: {
        formatter: (val, { series, dataPointIndex, seriesIndex }) => {
          const total =
            (series[0]?.[dataPointIndex] || 0) +
            (series[1]?.[dataPointIndex] || 0);

          // when hovering the blue segment, show both new + total
          if (seriesIndex === 1) {
            return `New: ${val} (Total: ${total})`;
          }
          return `Existing: ${val}`;
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        borderRadius: 4,
      },
    },
  };

  return { chartData: data, chartOptions: options };
}, [selectedYear, selectedType]);


  return (
    <Card extra="flex flex-col bg-white dark:bg-navy-800 h-full w-full rounded-3xl py-6 px-2 text-center">
      {/* Header + Controls */}
      <div className="mb-4 flex flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lightPrimary text-brand-500 dark:bg-navy-700 dark:text-white">
            <MdBarChart className="h-5 w-5" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-navy-700 dark:text-white">
              Provider Growth
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-300">
              Total vs new providers per month
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Year select */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">
              Year
            </span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-navy-700 outline-none dark:border-navy-600 dark:bg-navy-700 dark:text-white"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Provider type select */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-300">
              Type
            </span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-navy-700 outline-none dark:border-navy-600 dark:bg-navy-700 dark:text-white"
            >
              {providerTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-2">
        <div className="h-[250px] w-full xl:h-[350px]">
          <BarChart chartData={chartData} chartOptions={chartOptions} />
        </div>
      </div>
    </Card>
  );
};

export default ProviderChart;
