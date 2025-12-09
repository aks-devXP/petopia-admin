import React, { useState, useEffect } from 'react';
import { MdEdit } from "react-icons/md";

// Card component (assumed to be available)
const Card = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Editor = ({ profileData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...profileData });

  const roles = ['Admin', 'Manager', 'Sub-Admin'];

  // Update tempData when profileData changes (for image updates)
  useEffect(() => {
    if (!isEditing) {
      setTempData({ ...profileData });
    }
  }, [profileData, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData({ ...profileData });
  };

  const handleSave = () => {
    onUpdateProfile(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData({ ...profileData });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordReset = () => {
    // In a real app, this would trigger a password reset email or modal
    alert('Password reset email sent to your registered email address.');
  };

  return (
    <Card className="grid h-full w-full grid-cols-1 gap-6 rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Personal Info
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Update your personal details here
          </p>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="linear flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
            >
              <MdEdit className="text-lg" />
              Edit
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

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Name Fields */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            First Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={tempData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            />
          ) : (
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
              {profileData.firstName}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            Last Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={tempData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            />
          ) : (
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
              {profileData.lastName}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2 lg:col-span-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            Email
          </label>
          {isEditing ? (
            <input
              type="email"
              value={tempData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            />
          ) : (
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
              {profileData.email}
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            Phone Number
          </label>
          {isEditing ? (
            <input
              type="tel"
              value={tempData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            />
          ) : (
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
              {profileData.phone}
            </div>
          )}
        </div>

        {/* Role Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-navy-700 dark:text-white">
            Role
          </label>
          {isEditing ? (
            <select
              value={tempData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          ) : (
            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
              {profileData.role}
            </div>
          )}
        </div>
      </div>

      {/* Password Section */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Password
        </label>
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-navy-600 dark:bg-navy-700">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            ••••••••••••
          </span>
          <button
            onClick={handlePasswordReset}
            className="text-sm font-medium text-brand-500 transition-colors hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300"
          >
            Reset Password
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Editor;