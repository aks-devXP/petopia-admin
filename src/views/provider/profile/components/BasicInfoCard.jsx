import React from 'react';
import Card from './EditorCard';

const BasicInfoCard = ({
  isEditing,
  tempData,
  profileData,
  handleInputChange,
  handlePasswordReset,
  serviceTypes,
  experienceLevels,
}) => (
  <Card className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
    <div className="mb-6">
      <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
        Personal Information
      </h5>
      <p className="mt-1 text-sm font-medium text-gray-600">
        Let us know more about you
      </p>
    </div>
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Name Fields */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          First Name *
        </label>
        {isEditing ? (
          <input
            type="text"
            value={tempData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            required
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.firstName}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Last Name *
        </label>
        {isEditing ? (
          <input
            type="text"
            value={tempData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            required
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.lastName}
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Email *
        </label>
        {isEditing ? (
          <input
            type="email"
            value={tempData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            required
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.email}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Phone Number *
        </label>
        {isEditing ? (
          <input
            type="tel"
            value={tempData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            required
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.phone}
          </div>
        )}
      </div>

      {/* Service Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Service Type *
        </label>
        {isEditing ? (
          <select
            value={tempData.serviceType}
            onChange={(e) => handleInputChange('serviceType', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            required
          >
            <option value="">Select Service Type</option>
            {serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.serviceType?.charAt(0).toUpperCase() + profileData.serviceType?.slice(1)}
          </div>
        )}
      </div>

      {/* Experience Level */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Experience Level
        </label>
        {isEditing ? (
          <select
            value={tempData.experienceLevel}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
          >
            <option value="">Select Experience</option>
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.experienceLevel || 'Not specified'}
          </div>
        )}
      </div>
    </div>

    {/* Password Section */}
    <div className="space-y-4 mt-6">
      <label className="text-sm font-medium text-navy-700 dark:text-white">
        Password
      </label>
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-navy-600 dark:bg-navy-700">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          *************
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

export default BasicInfoCard;
