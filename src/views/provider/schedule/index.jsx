import Banner from "./components/Banner";
import HistoryCard from "./components/HistoryCard";
import DailySchedule from "./components/DailySchedule";

const SchedulePage = () => {
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      {/* Left Section */}
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        
        <DailySchedule/>
      </div>

      {/* Right Section */}
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <Banner
            upcoming="5"
            completed="30"
          />
        <HistoryCard />
      </div>
    </div>
  );
};

export default SchedulePage;
