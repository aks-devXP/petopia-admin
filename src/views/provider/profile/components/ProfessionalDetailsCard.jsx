import React from 'react';
import { MdAdd, MdDelete } from 'react-icons/md';
import Card from './EditorCard';

const ProfessionalDetailsCard = ({
  isEditing,
  tempData,
  profileData,
  handleInputChange,
  handleArrayChange,
  addArrayItem,
  removeArrayItem,
}) => (
  <Card className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
    <div className="mb-6">
      <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
        Professional Details
      </h5>
      <p className="mt-1 text-sm font-medium text-gray-600">
        Showcase your expertise and qualifications
      </p>
    </div>

    <div className="space-y-6">
      {/* Bio/Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Professional Bio
        </label>
        {isEditing ? (
          <textarea
            value={tempData.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            rows="4"
            placeholder="Tell pet owners about your experience, specializations, and passion for animal care..."
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white min-h-[100px]">
            {profileData.bio || 'No bio provided'}
          </div>
        )}
      </div>

      {/* Qualifications */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Qualifications & Certifications
        </label>
        {isEditing ? (
          <div className="space-y-3">
            {tempData.qualifications?.map((qualification, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => handleArrayChange('qualifications', index, e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                  placeholder="e.g., Doctor of Veterinary Medicine (DVM)"
                />
                <button
                  onClick={() => removeArrayItem('qualifications', index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('qualifications', '')}
              className="flex items-center gap-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
            >
              <MdAdd />
              Add Qualification
            </button>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.qualifications?.length > 0 ? (
              <ul className="space-y-1">
                {profileData.qualifications.map((qualification, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-brand-500 mt-1">-›</span>
                    {qualification}
                  </li>
                ))}
              </ul>
            ) : (
              'No qualifications listed'
            )}
          </div>
        )}
      </div>

      {/* Specializations */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Specializations
        </label>
        {isEditing ? (
          <div className="space-y-3">
            {tempData.specializations?.map((specialization, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={specialization}
                  onChange={(e) => handleArrayChange('specializations', index, e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                  placeholder="e.g., Small Animal Surgery, Behavioral Training"
                />
                <button
                  onClick={() => removeArrayItem('specializations', index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('specializations', '')}
              className="flex items-center gap-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
            >
              <MdAdd />
              Add Specialization
            </button>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.specializations?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {profileData.specializations.map((specialization, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-100 text-brand-800 dark:bg-brand-800 dark:text-brand-200"
                  >
                    {specialization}
                  </span>
                ))}
              </div>
            ) : (
              'No specializations listed'
            )}
          </div>
        )}
      </div>

      {/* Services Offered */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Services Offered
        </label>
        {isEditing ? (
          <div className="space-y-3">
            {tempData.servicesOffered?.map((service, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={service}
                  onChange={(e) => handleArrayChange('servicesOffered', index, e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                  placeholder="e.g., Vaccinations, Health Checkups, Emergency Care"
                />
                <button
                  onClick={() => removeArrayItem('servicesOffered', index)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <MdDelete />
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem('servicesOffered', '')}
              className="flex items-center gap-2 text-brand-500 hover:text-brand-600 text-sm font-medium"
            >
              <MdAdd />
              Add Service
            </button>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.servicesOffered?.length > 0 ? (
              <ul className="space-y-1">
                {profileData.servicesOffered.map((service, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-brand-500 mt-1">-›</span>
                    {service}
                  </li>
                ))}
              </ul>
            ) : (
              'No services listed'
            )}
          </div>
        )}
      </div>

      {/* Working Hours */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Working Hours
        </label>
        {isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">Start Time</label>
              <input
                type="time"
                value={tempData.workingHours?.start || '09:00'}
                onChange={(e) => handleInputChange('workingHours', {
                  ...tempData.workingHours,
                  start: e.target.value
                })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-600 dark:text-gray-400">End Time</label>
              <input
                type="time"
                value={tempData.workingHours?.end || '18:00'}
                onChange={(e) => handleInputChange('workingHours', {
                  ...tempData.workingHours,
                  end: e.target.value
                })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            </div>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.workingHours?.start && profileData.workingHours?.end
              ? `${profileData.workingHours.start} - ${profileData.workingHours.end}`
              : '9:00 AM - 6:00 PM (Default)'
            }
          </div>
        )}
      </div>

      {/* Emergency Services */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Emergency Services Available
        </label>
        {isEditing ? (
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={tempData.emergencyServices || false}
              onChange={(e) => handleInputChange('emergencyServices', e.target.checked)}
              className="w-4 h-4 text-brand-500 bg-gray-100 border-gray-300 rounded focus:ring-brand-500 dark:focus:ring-brand-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <span className="text-sm text-navy-700 dark:text-white">
              I provide emergency/after-hours services
            </span>
          </div>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              profileData.emergencyServices
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
            }`}>
              {profileData.emergencyServices ? 'Available' : 'Not Available'}
            </span>
          </div>
        )}
      </div>
    </div>
  </Card>
);

export default ProfessionalDetailsCard;
