import React from 'react'
import { MdAdd, MdDelete } from "react-icons/md";

const EditableList = ({ items, onChange, onAdd, onRemove, isEditing, label }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-navy-700 dark:text-white">
      {label}
    </label>
    {isEditing ? (
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={item}
              onChange={(e) => onChange(index, e.target.value)}
              className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            />
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 p-2"
            >
              <MdDelete />
            </button>
          </div>
        ))}
        <button
          onClick={() => onAdd()}
          className="flex items-center gap-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
        >
          <MdAdd />
          Add {label}
        </button>
      </div>
    ) : (
      <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
        {items.length > 0 ? (
          <ul className="space-y-1">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-brand-500 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          `No ${label.toLowerCase()} listed`
        )}
      </div>
    )}
  </div>
);

export default EditableList
