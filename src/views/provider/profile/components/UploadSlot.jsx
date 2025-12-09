import React from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';

const UploadSlot = ({
  src,
  onAdd,
  onDelete,
  shape = 'rect',
  disabled = false,
  label,
}) => {
  const isEmpty = !src;
  const baseShape = shape === 'circle' ? 'rounded-full' : 'rounded-xl';
  const sizeClass = (() => {
    if (shape === 'banner') return 'h-40 w-full md:h-48';
    if (shape === 'circle') return 'w-28 h-28 md:w-32 md:h-32';
    return 'h-28 w-full';
  })();

  if (isEmpty) {
    return (
      <button
        type="button"
        onClick={disabled ? undefined : onAdd}
        className={`flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-navy-600 bg-gray-50 dark:bg-navy-700 ${baseShape} ${sizeClass} text-gray-500 dark:text-gray-400 transition-colors ${disabled ? 'cursor-not-allowed opacity-60' : 'hover:border-brand-500 hover:text-brand-500'}`}
        aria-label={label || 'Add image'}
      >
        <MdAdd className="text-3xl" />
      </button>
    );
  }

  return (
    <div className={`relative ${baseShape} ${sizeClass}`}>
      <div className={`h-full w-full overflow-hidden ${baseShape}`}>
        <img
          src={src}
          alt={label || 'Uploaded'}
          className="h-full w-full object-cover"
        />
      </div>
      {!disabled && (
        <button
          type="button"
          onClick={onDelete}
          className="absolute top-2 right-2 z-10 rounded-full bg-red-500 p-1.5 text-white shadow-md transition-colors hover:bg-red-600"
          aria-label={label ? `Delete ${label}` : 'Delete image'}
          style={{ transform: 'translate(25%, -25%)' }}
        >
          <MdDelete className="text-base" />
        </button>
      )}
    </div>
  );
};

export default UploadSlot;
