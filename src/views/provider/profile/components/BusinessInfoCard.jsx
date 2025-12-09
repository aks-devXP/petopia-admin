import React from 'react';
import { MdLocationOn, MdStar } from 'react-icons/md';
import Card from './EditorCard';

const BusinessInfoCard = ({
  isEditing,
  tempData,
  profileData,
  handleInputChange,
  availabilityOptions,
}) => (
  <Card className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
    <div className="mb-6">
      <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
        Business Information
      </h5>
      <p className="mt-1 text-sm font-medium text-gray-600">
        Manage your business details and location
      </p>
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Business Name */}
      <div className="space-y-2 lg:col-span-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Business Name
        </label>
        {isEditing ? (
          <input
            type="text"
            value={tempData.businessName}
            onChange={(e) => handleInputChange('businessName', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            placeholder="e.g., Happy Paws Veterinary Clinic"
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.businessName || 'Not specified'}
          </div>
        )}
      </div>

      {/* Location */}
      <div className="space-y-2 lg:col-span-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white flex items-center gap-2">
          <MdLocationOn className="text-lg" />
          Location *
        </label>
        {isEditing ? (
          <input
            type="text"
            value={tempData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            placeholder="e.g., Downtown District, City Center"
            required
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.location}
          </div>
        )}
      </div>

      {/* Full Address */}
      <div className="space-y-2 lg:col-span-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Full Address
        </label>
        {isEditing ? (
          <textarea
            value={tempData.fullAddress}
            onChange={(e) => handleInputChange('fullAddress', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            rows="3"
            placeholder="Complete business address..."
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white min-h-[80px]">
            {profileData.fullAddress || 'Not specified'}
          </div>
        )}
      </div>

      {/* Pricing */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Base Price (Rs.)
        </label>
        {isEditing ? (
          <input
            type="number"
            value={tempData.basePrice}
            onChange={(e) => handleInputChange('basePrice', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
            placeholder="0"
            min="0"
          />
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            Rs.{profileData.basePrice || '0'}
          </div>
        )}
      </div>

      {/* Pricing Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Pricing Type
        </label>
        {isEditing ? (
          <select
            value={tempData.pricingType}
            onChange={(e) => handleInputChange('pricingType', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
          >
            <option value="consultation">Per Consultation</option>
            <option value="hour">Per Hour</option>
            <option value="session">Per Session</option>
            <option value="day">Per Day</option>
          </select>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            {profileData.pricingType || 'consultation'}
          </div>
        )}
      </div>

      {/* Availability Status */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white">
          Availability Status
        </label>
        {isEditing ? (
          <select
            value={tempData.availabilityStatus}
            onChange={(e) => handleInputChange('availabilityStatus', e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
          >
            {availabilityOptions.map((option) => (
              <option key={option} value={option.toLowerCase()}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              profileData.availabilityStatus === 'available' 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200' 
                : profileData.availabilityStatus === 'busy'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200'
                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200'
            }`}>
              {profileData.availabilityStatus?.charAt(0).toUpperCase() + profileData.availabilityStatus?.slice(1)}
            </span>
          </div>
        )}
      </div>

      {/* Rating Display */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-navy-700 dark:text-white flex items-center gap-2">
          <MdStar className="text-lg text-yellow-400" />
          Current Rating
        </label>
        <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{profileData.rating || '4.5'}</span>
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <MdStar key={star} className="text-sm" />
              ))}
            </div>
            <span className="text-gray-500">({profileData.reviewCount || 0} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

export default BusinessInfoCard;
