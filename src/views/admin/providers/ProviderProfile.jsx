import React from "react";
import { useParams } from "react-router-dom";
import Card from "components/card";
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  PawPrint,
  Clock,
} from "lucide-react";

const mockUsers = {
  "U-1001": {
    userId: "U-1001",
    firstName: "Aditya",
    lastName: "Kumar",
    role: "User",
    email: "aditya.kumar@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, India",
    dob: "1999-06-21",
    joinedOn: "2025-01-12",
    address: {
      country: "India",
      city: "Bengaluru · Indiranagar",
      postalCode: "560038",
    },
    pets: [
      { id: 1, name: "Bruno", species: "Dog", breed: "Labrador", age: "3 years" },
      { id: 2, name: "Milo", species: "Dog", breed: "Indie", age: "1 year" },
    ],
    bookings: [
      {
        id: 1,
        type: "Vet Consultation",
        provider: "Dr. Sharma Pet Clinic",
        date: "2025-03-01",
        time: "10:30 AM",
        status: "Completed",
      },
      {
        id: 2,
        type: "Grooming",
        provider: "Happy Paws Groomers",
        date: "2025-03-15",
        time: "4:00 PM",
        status: "Cancelled by User",
      },
      {
        id: 3,
        type: "Training Session",
        provider: "Pawfect Trainers",
        date: "2025-04-02",
        time: "6:00 PM",
        status: "Confirmed",
      },
    ],
  },
};

export default function UserProfile() {
  const { userId } = useParams();

  const user =
    mockUsers[userId] ||
    mockUsers["U-1001"]; // fallback dummy if route id doesn't match

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="w-full">
      {/* Banner + Avatar + Basic Info */}
      <div className="relative mt-6">
        {/* Banner */}
        <div className="h-32 w-full rounded-xl bg-gradient-to-r from-emerald-400/80 to-sky-400/80 dark:from-emerald-500 dark:to-sky-600 shadow-sm" />

        {/* Avatar & Text */}
        <div className="absolute -bottom-12 left-6 flex items-end gap-4">
          {/* Avatar */}
          <div className="h-[96px] w-[96px] rounded-full border-[4px] border-white dark:border-navy-700 overflow-hidden bg-slate-200 dark:bg-navy-600 shadow-md flex items-center justify-center">
            {/* Replace with real profile pic when available */}
            <UserIcon className="h-10 w-10 text-slate-500 dark:text-slate-200" />
          </div>

          {/* Basic Info */}
          <div className="pb-2">
            <h1 className="text-xl font-semibold text-navy-700 dark:text-white">
              {fullName}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {user.role} · User ID: {user.userId}
            </p>
            <div className="mt-1 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add top spacing so sections clear the avatar */}
      <div className="mt-16 flex flex-col gap-6">
        {/* Personal Information */}
        <Card extra={"w-full px-6 py-5"}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
              Personal Information
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                FIRST NAME
              </p>
              <p className="mt-1 text-sm text-navy-700 dark:text-white">
                {user.firstName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                LAST NAME
              </p>
              <p className="mt-1 text-sm text-navy-700 dark:text-white">
                {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                DATE OF BIRTH
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-navy-700 dark:text-white">
                <Calendar className="h-4 w-4 text-gray-400" />
                {user.dob}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                EMAIL ADDRESS
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-navy-700 dark:text-white">
                <Mail className="h-4 w-4 text-gray-400" />
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                PHONE NUMBER
              </p>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-navy-700 dark:text-white">
                <Phone className="h-4 w-4 text-gray-400" />
                {user.phone}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                USER ROLE
              </p>
              <p className="mt-1 text-sm text-navy-700 dark:text-white">
                {user.role}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6 border-t border-gray-100 pt-4 dark:border-navy-600">
            <h3 className="mb-3 text-sm font-semibold text-navy-700 dark:text-white">
              Address
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  COUNTRY
                </p>
                <p className="mt-1 text-sm text-navy-700 dark:text-white">
                  {user.address.country}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  CITY / AREA
                </p>
                <p className="mt-1 text-sm text-navy-700 dark:text-white">
                  {user.address.city}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  POSTAL CODE
                </p>
                <p className="mt-1 text-sm text-navy-700 dark:text-white">
                  {user.address.postalCode}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Pet Information */}
        <Card extra={"w-full px-6 py-5"}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
              Pet Information
            </h2>
            <div className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
              <PawPrint className="h-4 w-4" />
              <span>{user.pets.length} pets</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 dark:border-navy-600 dark:text-gray-300">
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Species</th>
                  <th className="py-2 pr-4">Breed</th>
                  <th className="py-2 pr-4">Age</th>
                </tr>
              </thead>
              <tbody>
                {user.pets.map((pet, idx) => (
                  <tr
                    key={pet.id}
                    className="border-b border-gray-50 text-sm text-navy-700 last:border-b-0 dark:border-navy-700 dark:text-white"
                  >
                    <td className="py-2 pr-4 text-xs text-gray-500 dark:text-gray-300">
                      {idx + 1}
                    </td>
                    <td className="py-2 pr-4">{pet.name}</td>
                    <td className="py-2 pr-4">{pet.species}</td>
                    <td className="py-2 pr-4">{pet.breed}</td>
                    <td className="py-2 pr-4">{pet.age}</td>
                  </tr>
                ))}
                {user.pets.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-3 text-center text-sm text-gray-500 dark:text-gray-300"
                    >
                      No pets added for this user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Booking Information */}
        <Card extra={"w-full px-6 py-5"}>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-700 dark:text-white">
              Booking History
            </h2>
            <div className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-300">
              <Clock className="h-4 w-4" />
              <span>{user.bookings.length} records</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-semibold text-gray-500 dark:border-navy-600 dark:text-gray-300">
                  <th className="py-2 pr-4">#</th>
                  <th className="py-2 pr-4">Type</th>
                  <th className="py-2 pr-4">Provider</th>
                  <th className="py-2 pr-4">Date</th>
                  <th className="py-2 pr-4">Time</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.bookings.map((booking, idx) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-50 text-sm text-navy-700 last:border-b-0 dark:border-navy-700 dark:text-white"
                  >
                    <td className="py-2 pr-4 text-xs text-gray-500 dark:text-gray-300">
                      {idx + 1}
                    </td>
                    <td className="py-2 pr-4">{booking.type}</td>
                    <td className="py-2 pr-4">{booking.provider}</td>
                    <td className="py-2 pr-4">{booking.date}</td>
                    <td className="py-2 pr-4">{booking.time}</td>
                    <td className="py-2 pr-4">
                      <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-navy-700 dark:text-gray-100">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {user.bookings.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-3 text-center text-sm text-gray-500 dark:text-gray-300"
                    >
                      No bookings found for this user.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
