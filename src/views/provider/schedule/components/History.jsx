import React, { useState } from "react";
import Card from "components/card";
import { MdArrowBack, MdFilterList, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const appointmentHistory = [
    {
      id: 1,
      customerName: "Amit Sharma",
      petName: "Buddy",
      service: "General Checkup",
      price: 500,
      date: "2025-08-25",
      time: "10:30 AM",
      status: "completed"
    },
    {
      id: 2,
      customerName: "Neha Verma",
      petName: "Fluffy",
      service: "Vaccination",
      price: 650,
      date: "2025-09-10",
      time: "04:15 PM",
      status: "upcoming"
    },
    {
      id: 3,
      customerName: "Rohan Gupta",
      petName: "Max",
      service: "Grooming Session",
      price: 400,
      date: "2025-09-05",
      time: "09:45 AM",
      status: "active"
    },
    {
      id: 4,
      customerName: "Priya Nair",
      petName: "Luna",
      service: "Dental Care",
      price: 550,
      date: "2025-08-22",
      time: "06:20 PM",
      status: "completed"
    },
    {
      id: 5,
      customerName: "Siddharth Rao",
      petName: "Rocky",
      service: "Training Session",
      price: 600,
      date: "2025-08-21",
      time: "11:10 AM",
      status: "completed"
    },
    {
      id: 6,
      customerName: "Kavya Patel",
      petName: "Mittens",
      service: "Pet Sitting",
      price: 450,
      date: "2025-09-08",
      time: "02:30 PM",
      status: "upcoming"
    },
    {
      id: 7,
      customerName: "Arjun Singh",
      petName: "Charlie",
      service: "Emergency Care",
      price: 700,
      date: "2025-09-05",
      time: "11:00 AM",
      status: "active"
    },
    {
      id: 8,
      customerName: "Meera Joshi",
      petName: "Whiskers",
      service: "Grooming",
      price: 350,
      date: "2025-08-18",
      time: "03:45 PM",
      status: "completed"
    }
  ];

  const statusConfig = {
    completed: { 
      color: "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
      label: "Completed" 
    },
    upcoming: { 
      color: "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
      label: "Upcoming" 
    },
    active: { 
      color: "text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30",
      label: "Active" 
    }
  };

  const handleBackClick = () => {
    navigate('/admin/schedule');
  };

  const filteredHistory = appointmentHistory.filter(appointment => {
    const matchesStatus = selectedStatus === "all" || appointment.status === selectedStatus;
    const matchesSearch = searchTerm === "" || 
      appointment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.petName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: appointmentHistory.length,
    completed: appointmentHistory.filter(a => a.status === "completed").length,
    upcoming: appointmentHistory.filter(a => a.status === "upcoming").length,
    active: appointmentHistory.filter(a => a.status === "active").length,
  };

  return (
    <div className="mt-3 w-full">
      <Card extra={"!z-5 overflow-hidden"}>
        {/* Header */}
        <div className="flex flex-col space-y-4 rounded-t-3xl p-4 border-b border-gray-200 dark:border-white/10">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleBackClick}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 transition duration-200"
              >
                <MdArrowBack className="h-4 w-4 text-gray-600 dark:text-white" />
              </button>
              <div className="text-xl font-bold text-navy-700 dark:text-white">
                Service History
              </div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-300 hidden sm:block">
              {filteredHistory.length} of {appointmentHistory.length} appointments
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer, pet, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:border-white/20 dark:bg-white/5 dark:text-white"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All" },
              { key: "upcoming", label: "Upcoming" },
              { key: "active", label: "Active" },
              { key: "completed", label: "Completed" }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setSelectedStatus(filter.key)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition duration-200 ${
                  selectedStatus === filter.key
                    ? "bg-brand-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20"
                }`}
              >
                {filter.label} ({statusCounts[filter.key]})
              </button>
            ))}
          </div>
        </div>
        
        {/* History List */}
        <div className="max-h-[calc(100vh-300px)] overflow-y-auto">
          {filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
              <MdFilterList className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No appointments found</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </div>
          ) : (
            filteredHistory.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 p-4 last:border-b-0 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition duration-200"
              >
                {/* Left Section - Customer & Pet Info */}
                <div className="flex-1 space-y-2">
                  {/* Customer Name */}
                  <h5 className="text-base font-semibold text-navy-700 dark:text-white">
                    {appointment.customerName}
                  </h5>
                  
                  {/* Pet & Service Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Pet: <span className="font-medium text-navy-700 dark:text-white">{appointment.petName}</span>
                    </span>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {appointment.service}
                    </span>
                  </div>
                  
                  {/* Date & Time */}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {appointment.date} • {appointment.time}
                  </p>
                </div>
                
                {/* Right Section - Status & Price */}
                <div className="flex flex-row sm:flex-col items-start sm:items-end gap-3 sm:gap-2 mt-3 sm:mt-0">
                  {/* Status Badge */}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[appointment.status].color}`}>
                    {statusConfig[appointment.status].label}
                  </span>
                  
                  {/* Price */}
                  <div className="text-lg font-bold text-navy-700 dark:text-white">
                    ₹{appointment.price}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary Footer */}
        {filteredHistory.length > 0 && (
          <div className="border-t border-gray-200 dark:border-white/10 p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <span>
                Showing {filteredHistory.length} appointment{filteredHistory.length !== 1 ? 's' : ''}
              </span>
              <span className="font-medium">
                Total Revenue: ₹{filteredHistory.reduce((sum, apt) => sum + apt.price, 0)}
              </span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default History;