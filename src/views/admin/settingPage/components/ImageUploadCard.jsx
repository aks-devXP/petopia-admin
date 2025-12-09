import React from 'react'
import {MdImage} from "react-icons/md";

const ImageUploadCard = ({ src, onChange, label, isEditing }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-navy-700 dark:text-white capitalize">
      {label}
    </label>
    <div className="relative h-48 rounded-xl overflow-hidden bg-gray-200 dark:bg-navy-700 group shadow-sm">
      <img
        src={src || "/logo_transparent.png"}
        alt={label}
        className="w-full h-full object-cover"
      />
      {isEditing && (
        <button
          onClick={onChange}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        >
          <MdImage className="text-3xl mr-2" />
          Change {label}
        </button>
      )}
    </div>
  </div>
);

export default ImageUploadCard
