import React from "react";
import Card from "components/card";
import { useNavigate } from "react-router-dom";

const HistoryCard = () => {
  const navigate = useNavigate();
  
  const visitHistory = [
    { owner: "Amit Sharma", price: 500, date: "2025-08-25", time: "10:30 AM" },
    { owner: "Neha Verma", price: 650, date: "2025-08-24", time: "04:15 PM" },
    { owner: "Rohan Gupta", price: 400, date: "2025-08-23", time: "09:45 AM" },
    { owner: "Priya Nair", price: 550, date: "2025-08-22", time: "06:20 PM" },
    { owner: "Siddharth Rao", price: 600, date: "2025-08-21", time: "11:10 AM" },
  ];

  const handleSeeAllClick = () => {
    navigate("/provider/schedule/history");
  };

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Visit History
        </div>
        <button 
          onClick={handleSeeAllClick}
          className="linear rounded-[20px] bg-lightPrimary px-4 py-1 text-sm font-medium text-brand-500 transition duration-200 hover:bg-gray-100 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          See all
        </button>
      </div>

      {/* History List */}
      {visitHistory.map((visit, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-gray-200 px-3 py-3 last:border-b-0 dark:border-white/10"
        >
          {/* Left side: Pet Owner */}
          <div className="flex flex-col">
            <h5 className="text-base font-semibold text-navy-700 dark:text-white">
              {visit.owner}
            </h5>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {visit.date} • {visit.time}
            </p>
          </div>
          {/* Right side: Price */}
          <div className="text-sm font-bold text-navy-700 dark:text-white">
            ₹{visit.price}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default HistoryCard;
