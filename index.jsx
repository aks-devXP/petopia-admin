import Table from "./components/Table";
import {
  columnsDataGroomers,
  columnsDataCareTakers,
  columnsDataTrainers
} from "./variables/columnsData";

// Data
import groomersData from "./variables/groomerData.json";
import careTakersData from "./variables/petCareTakersData.json";
import trainersData from "./variables/trainersData.json";

const petServices = () => {
  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5">
        <Table
          title="Groomers"
          columnsData={columnsDataGroomers}
          tableData={groomersData}
        />
        <Table
          title="Pet Care Takers"
          columnsData={columnsDataCareTakers}
          tableData={careTakersData}
        />
        <Table
          title="Trainers"
          columnsData={columnsDataTrainers}
          tableData={trainersData}
        />
      </div>
    </div>
  );
};

export default petServices;
