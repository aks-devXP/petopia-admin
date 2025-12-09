import { 
  Stethoscope, 
  Scissors, 
  Dumbbell, 
  CalendarCheck, 
  CalendarRange, 
  BarChart3, 
  Wallet, 
  CreditCard 
} from "lucide-react";

import Widget from "components/widget/Widget";
import UserTable from "./components/ProviderTable";
import userData from "./variables/userData.json";
import WeeklyRevenue from "./components/WeeklyRevenue";
import PieChartCard from "./components/PieChartCard";

const Providers = () => {
  const providerStats = [
    // Provider counts
    {
      id: "total-vets",
      icon: <Stethoscope className="h-7 w-7" />,
      title: "Total Vets",
      subtitle: "38",
    },
    {
      id: "total-groomers",
      icon: <Scissors className="h-7 w-7" />,
      title: "Total Groomers",
      subtitle: "24",
    },
    {
      id: "total-trainers",
      icon: <Dumbbell className="h-7 w-7" />,
      title: "Total Trainers",
      subtitle: "17",
    },

    // Booking counts
    {
      id: "vet-bookings",
      icon: <CalendarCheck className="h-7 w-7" />,
      title: "Vet Bookings",
      subtitle: "1,245",
    },
    {
      id: "groomer-bookings",
      icon: <CalendarRange className="h-7 w-7" />,
      title: "Groomer Bookings",
      subtitle: "842",
    },
    {
      id: "trainer-bookings",
      icon: <CalendarCheck className="h-7 w-7" />,
      title: "Trainer Bookings",
      subtitle: "463",
    },

    // Finance
    {
      id: "total-sales",
      icon: <BarChart3 className="h-7 w-7" />,
      title: "Total Sales",
      subtitle: "2,550",
    },
    {
      id: "total-revenue",
      icon: <Wallet className="h-7 w-7" />,
      title: "Total Revenue",
      subtitle: "₹4,82,300",
    },
    {
      id: "pending-payouts",
      icon: <CreditCard className="h-7 w-7" />,
      title: "Pending Payouts",
      subtitle: "₹63,750",
    },
  ];

  const revenueData = {
    subscribers: 40,
    vets: 25,
    groomers: 15,
    trainers: 10,
    caretakers: 10,
  };

  const revenueOptions = {
    labels: ["Subscribers", "Vets", "Groomers", "Trainers", "Pet Care Takers"],
    legend: { show: false },
  };

  return (
    <div className="w-full">
      {/* ---------- TOP WIDGETS ---------- */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {providerStats.map((item) => (
          <Widget
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>

      {/* ---------- CHARTS SECTION ---------- */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-5">
        {/* Weekly Revenue */}
        <div className="col-span-1 lg:col-span-3">
          <WeeklyRevenue />
        </div>

        {/* Pie Chart */}
        <div className="col-span-1 lg:col-span-2">
          <PieChartCard data={revenueData} options={revenueOptions} />
        </div>
      </div>

      {/* ---------- PROVIDER LIST TABLE ---------- */}
      <div className="mt-10">
        <UserTable userData={userData} />
      </div>
    </div>
  );
};

export default Providers;
