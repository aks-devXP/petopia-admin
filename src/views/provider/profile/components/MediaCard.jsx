import React from 'react';
import { MdEdit, MdAdd, MdDelete } from 'react-icons/md';
import Card from './EditorCard';
import UploadSlot from './UploadSlot';

const MediaCard = ({
  isEditing,
  tempData,
  imagePreviews,
  openFilePicker,
  handleImageRemove,
  handleEdit,
  handleCancel,
  handleSave,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
  profileData,
}) => (
  <Card className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
    <div className="space-y-6">
      <div className="w-full flex justify-between">
            <div className="mb-6">
      <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Update Your Profile
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Present yourself to users
          </p>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="linear flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
              >
                <MdEdit className="text-lg" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="linear flex items-center px-4 py-2 text-sm text-red-400 dark:text-red-300 transition duration-200 hover:dark:text-red-500 hover:text-red-500 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="linear flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-green-700 active:bg-green-700"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            Banner Image
          </label>
          <UploadSlot
            src={imagePreviews.banner}
            onAdd={() => openFilePicker('banner')}
            onDelete={() => handleImageRemove('banner')}
            shape="banner"
            disabled={!isEditing}
            label="Banner image"
          />
        </div>

        <div className="grid items-start gap-4 md:grid-cols-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Profile Image
            </label>
            <UploadSlot
              src={imagePreviews.profileImage}
              onAdd={() => openFilePicker('profileImage')}
              onDelete={() => handleImageRemove('profileImage')}
              shape="circle"
              disabled={!isEditing}
              label="Profile image"
            />
          </div>

          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-navy-700 dark:text-white">
                Portfolio Images
              </label>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {(tempData.portfolioImages?.length || 0)}/4
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <UploadSlot
                  key={index}
                  src={imagePreviews.portfolioImages?.[index]}
                  onAdd={() => openFilePicker('portfolioImages', index)}
                  onDelete={() => handleImageRemove('portfolioImages', index)}
                  disabled={!isEditing}
                  label={`Portfolio image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Certification Documents
        </label>
        {isEditing ? (
          <div className="space-y-3">
            {tempData.certificationDocuments?.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg dark:border-navy-600">
                <div className="flex-1">
                  <input
                    type="text"
                    value={doc.name || ''}
                    onChange={(e) => handleArrayChange('certificationDocuments', index, { ...doc, name: e.target.value })}
                    className="w-full text-sm font-medium text-navy-700 dark:text-white bg-transparent border-none outline-none"
                    placeholder="Document name..."
                  />
                </div>
                <button
                  onClick={() => removeArrayItem('certificationDocuments', index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('certificationDocuments', { name: '', url: '' })}
              className="flex items-center gap-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
            >
              <MdAdd />
              Add Document
            </button>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.certificationDocuments?.length > 0 ? (
              <ul className="space-y-2">
                {profileData.certificationDocuments.map((doc, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {doc.name}
                  </li>
                ))}
              </ul>
            ) : (
              'No certification documents uploaded'
            )}
          </div>
        )}
      </div>
    </div>
  </Card>
);

export default MediaCard;
