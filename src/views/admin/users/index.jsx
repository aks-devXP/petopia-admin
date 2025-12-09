import { Users as UsersIcon, UserPlus, CalendarDays } from "lucide-react";

import Widget from "components/widget/Widget";
import UserTable from "views/admin/users/components/UserTable";
import userData from "./variables/userData.json"; // renamed from tableDataComplex.json

const Users = () => {
  const stats = [
    {
      id: 1,
      icon: <UsersIcon className="h-7 w-7" />,
      title: "Total Users",
      subtitle: "12,430",
    },
    {
      id: 2,
      icon: <UserPlus className="h-7 w-7" />,
      title: "New Users (Last Week)",
      subtitle: "248",
    },
    {
      id: 3,
      icon: <CalendarDays className="h-7 w-7" />,
      title: "New Users (Last Month)",
      subtitle: "1,042",
    },
  ];
  return (
    <div>
      {/* Card widget */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {stats.map((item) => (
          <Widget
            key={item.id}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}
      </div>

      {/* Users Table */}
      <div className="mt-8">
        <UserTable userData={userData} />
      </div>
    </div>
  );
};

export default Users;
