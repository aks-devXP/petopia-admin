import React from "react";
import Card from "components/card";

const NgoManageQuery = () => {
  return (
    <div className="w-full space-y-6">
      <Card extra="p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white">
          Manage Queries
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Query management tools for NGO providers will appear here.
        </p>
      </Card>
    </div>
  );
};

export default NgoManageQuery;
