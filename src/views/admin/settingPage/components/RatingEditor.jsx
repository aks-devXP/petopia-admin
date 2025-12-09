import React from 'react'
import { FaPaw } from "react-icons/fa";

const RatingEditor = ({ value, onChange, label, isEditing }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-navy-700 dark:text-white flex items-center gap-2">
      {label}
    </label>
    {isEditing ? (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((paw) => (
          <FaPaw
            key={paw}
            className={`text-lg cursor-pointer ${paw <= value ? 'text-yellow-400' : 'text-gray-300'}`}
            onClick={() => onChange(paw)}
          />
        ))}
      </div>
    ) : (
      <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((paw) => (
            <FaPaw
              key={paw}
              className={`text-lg ${paw <= value ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="ml-2">{value}/5</span>
        </div>
      </div>
    )}
  </div>
);

export default RatingEditor