import React from "react";
import Card from "components/card";
import { FiSearch } from "react-icons/fi";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

const columnHelper = createColumnHelper();

export default function ProviderTable({ userData }) {
  const [sorting, setSorting] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pageIndex, setPageIndex] = React.useState(0);
  const pageSize = 20;
  const navigate = useNavigate();

  // Filter by userId or name (case-insensitive)
  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return userData;
    const term = searchTerm.toLowerCase();
    return userData.filter((user) => {
      const id = String(user.userId || "").toLowerCase();
      const name = String(user.name || "").toLowerCase();
      return id.includes(term) || name.includes(term);
    });
  }, [userData, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  // Reset page if search reduces total pages
  React.useEffect(() => {
    if (pageIndex > totalPages - 1) {
      setPageIndex(0);
    }
  }, [totalPages, pageIndex]);

  const columns = [
    columnHelper.accessor("userId", {
      id: "userId",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          USER ID
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          NAME
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("petsCount", {
      id: "petsCount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          PETS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("bookingCount", {
      id: "bookingCount",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          BOOKINGS
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("cityArea", {
      id: "cityArea",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          CITY / AREA
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("joinedOn", {
      id: "joinedOn",
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          JOINED ON
        </p>
      ),
      cell: (info) => (
        <p className="text-sm text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
  ];

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const pageRows = table
    .getRowModel()
    .rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const handlePrevPage = () => {
    setPageIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setPageIndex((prev) => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Card extra={"w-full h-full px-6 pb-6 sm:overflow-x-auto"}>
      <header className="relative flex items-center justify-between pt-4 h-16">
        <h2 className="text-xl font-bold text-navy-700 dark:text-white">
          Users Overview
        </h2>

        {/* Search */}
        <div className="flex h-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
          <p className="pl-3 pr-2 text-xl">
            <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </p>
          <input
            type="text"
            placeholder="Search by User ID or Name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPageIndex(0);
            }}
            className="block h-full w-full rounded-full bg-lightPrimary text-sm font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white"
          />
        </div>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer border-b-[1px] border-gray-200 pt-4 pb-2 pr-4 text-start"
                  >
                    <div className="items-center justify-between text-xs text-gray-200">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {pageRows.map((row) => (
              <tr
                key={row.id}
                onClick={() =>
                  navigate(`/admin/provider-dashboard/${row.original.userId}`)
                }
                className="cursor-pointer hover:bg-gray-50 dark:hover:bg-navy-700/50"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="min-w-[150px] border-white/0 py-3 pr-4"
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}

            {pageRows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-6 text-center text-sm text-gray-500 dark:text-gray-300"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm text-navy-700 dark:text-white">
        <span>
          Page{" "}
          {filteredData.length === 0 ? 0 : pageIndex + 1} /{" "}
          {filteredData.length === 0 ? 0 : totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevPage}
            disabled={pageIndex === 0}
            className="rounded-md border px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50 dark:border-navy-600"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={pageIndex >= totalPages - 1 || filteredData.length === 0}
            className="rounded-md border px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50 dark:border-navy-600"
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
}
