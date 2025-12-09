import bg_vet from "assets/img/vet/background-vet.png";
import Widget from "components/widget/Widget";
import {
  MdCalendarToday,
  MdEventAvailable,
  MdOutlineSchedule,
  MdChecklist
} from "react-icons/md";

const Banner = ({ upcoming, completed }) => {
  return (
    <div
      className="flex w-full flex-col rounded-[20px] bg-cover px-4 py-4 md:px-6 md:py-6"
      style={{ backgroundImage: `url(${bg_vet})` }}
    >
      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 gap-6">
        <Widget
          icon={<MdCalendarToday className="h-6 w-6" />}
          title="Upcoming Schedule"
          subtitle={upcoming}
        />
        <Widget
          icon={<MdEventAvailable className="h-6 w-6" />}
          title="Completed"
          subtitle={completed}
        />
      </div>
      
    </div>
  );
};

export default Banner;
