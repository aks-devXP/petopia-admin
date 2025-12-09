import { MdBarChart, MdStar, MdEventAvailable, MdCheckCircle } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { IoMdHome } from "react-icons/io"; 

import Widget from "components/widget/Widget";
import WeeklyRevenue from "./components/WeeklyRevenue";
import PieChartCard from "./components/PieChartCard";

const Users = () => {
  const revenueData = {
    subscribers: 40,
    vets: 25,
    groomers: 15,
    trainers: 10,
    caretakers: 10
  };
  const revenueOptions = {
    labels: ["Subscribers", "Vets", "Groomers", "Trainers", "Pet Care Takers"],
    legend: { show: false },
  };
  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<MdBarChart className="h-7 w-7 text-brand-500" />}
          title={"Revenue"}
          subtitle={"₹ 34,050"}
        />
        <Widget
          icon={<FaUsers className="h-7 w-7 text-blue-500" />}
          title={"Users Served"}
          subtitle={"642"}
        />
        <Widget
          icon={<MdEventAvailable className="h-7 w-7 text-green-500" />}
          title={"Upcoming"}
          subtitle={"12"}
        />
        <Widget
          icon={<MdCheckCircle className="h-7 w-7 text-emerald-500" />}
          title={"Completed"}
          subtitle={"574"}
        />
        <Widget
          icon={<MdStar className="h-7 w-7 text-yellow-500" />}
          title={"Rating"}
          subtitle={"4.8"}
        />
        <Widget
          icon={<IoMdHome className="h-7 w-7 text-purple-500" />}
          title={"Services"}
          subtitle={"5"}
        />
      </div>

      {/* Users Table */}
      <div className="mt-5 grid h-full grid-cols-1 gap-5 lg:grid-cols-5">
        <div className="col-span-1 lg:col-span-3 lg:mb-0">
          <WeeklyRevenue />
        </div>
        <div className="h-full col-span-1 lg:col-span-2 lg:mb-0">
          <PieChartCard data={revenueData} options={revenueOptions} />;
        </div>
      </div>
    </div>
  );
};

export default Users;
