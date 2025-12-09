import PieChart from "components/charts/PieChart";
import Card from "components/card";

const PieChartCard = ({ data }) => {
  // data = { subscribers: 40, vets: 20, groomers: 15, trainers: 15, caretakers: 10 }
  const series = [
    data.subscribers,
    data.vets,
    data.groomers,
    data.trainers,
    data.caretakers,
  ];

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Subscribers", "Vets", "Groomers", "Trainers", "Caretakers"],
    tooltip: {
      y: {
        formatter: (val) => `${val}%`, // show percentage on hover
      },
    },
    legend: {
      show: false, // we’ll render custom legend below
    },
    colors: [
      "#1E90FF", // blue
      "#38B2AC", // teal
      "#63B3ED", // light blue
      "#3182CE", // darker blue
      "#4FD1C5", // aqua-teal
    ],
    dataLabels: {
      enabled: false,
    },
  };

  const labels = [
    { name: "Subscribers", color: "bg-[#1E90FF]", value: data.subscribers },
    { name: "Vets", color: "bg-[#38B2AC]", value: data.vets },
    { name: "Groomers", color: "bg-[#63B3ED]", value: data.groomers },
    { name: "Trainers", color: "bg-[#3182CE]", value: data.trainers },
    { name: "Caretakers", color: "bg-[#4FD1C5]", value: data.caretakers },
  ];

  return (
    <Card extra="rounded-[20px] p-3 h-full">
      <div className="flex flex-row justify-between px-3 pt-2">
        <h4 className="text-lg font-bold text-navy-700 dark:text-white">
          Revenue Distribution
        </h4>

        <div className="mb-6 flex items-center justify-center">
          <select className="mb-3 mr-2 flex items-center justify-center text-sm font-bold text-gray-600 hover:cursor-pointer dark:!bg-navy-800 dark:text-white">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mb-auto flex h-[220px] w-full items-center justify-center">
        <PieChart options={chartOptions} series={series} />
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-between rounded-2xl px-6 py-3 shadow-2xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
        {labels.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center w-1/2 md:w-1/3 mb-3"
          >
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full ${item.color}`} />
              <p className="ml-2 text-sm font-normal text-gray-600">
                {item.name}
              </p>
            </div>
            <p className="mt-1 text-lg font-bold text-navy-700 dark:text-white">
              {item.value}%
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PieChartCard;
