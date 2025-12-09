import React, { useState, useEffect } from 'react';
import { MdEdit, MdLocationOn, MdStar, MdImage, MdAdd, MdDelete } from "react-icons/md";

// Card component
const Card = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Editor = ({ profileData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({ ...profileData });

  const serviceTypes = ['vet', 'groomer', 'trainer', 'caretaker'];
  const experienceLevels = ['1-2 years', '3-5 years', '6-10 years', '10+ years'];
  const availabilityOptions = ['Available', 'Busy', 'Unavailable'];

  // Update tempData when profileData changes
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

  const handleArrayChange = (field, index, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field, defaultValue = '') => {
    setTempData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setTempData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handlePasswordReset = () => {
    alert('Password reset email sent to your registered email address.');
  };

  const handleImageUpload = (field) => {
    // In a real app, this would handle file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // In production, upload to server and get URL
        const fakeUrl = URL.createObjectURL(file);
        handleInputChange(field, fakeUrl);
      }
    };
    fileInput.click();
  };

  return (
    <div className="space-y-6">
      {/* Basic Information Card */}
      <Card className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
              Basic Information
            </h5>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Update your basic profile details
            </p>
          </div>
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

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Profile Picture */}
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Profile Picture
            </label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-navy-700">
                <img
                  src={tempData.profileImage || 'https://via.placeholder.com/80x80'}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditing && (
                <button
                  onClick={() => handleImageUpload('profileImage')}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-brand-500 border border-brand-500 rounded-lg hover:bg-brand-50 dark:hover:bg-navy-700"
                >
                  <MdImage />
                  Change Photo
                </button>
              )}
            </div>
          </div>

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

      {/* Business Information Card */}
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
              Base Price (₹)
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
                ₹{profileData.basePrice || '0'}
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

      {/* Professional Details Card */}
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
                        <span className="text-brand-500 mt-1">•</span>
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
                        <span className="text-brand-500 mt-1">•</span>
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

      {/* Portfolio/Gallery Card */}
      <Card className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Portfolio & Gallery
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Showcase your work and facility
          </p>
        </div>

        <div className="space-y-6">
          {/* Portfolio Images */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Portfolio Images
            </label>
            {isEditing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tempData.portfolioImages?.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 dark:border-navy-600"
                      />
                      <button
                        onClick={() => removeArrayItem('portfolioImages', index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MdDelete className="text-sm" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => handleImageUpload('portfolioImages')}
                    className="w-full h-24 border-2 border-dashed border-gray-300 dark:border-navy-600 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 hover:border-brand-500 hover:text-brand-500 transition-colors"
                  >
                    <MdAdd className="text-2xl" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {profileData.portfolioImages?.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profileData.portfolioImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                ) : (
                  'No portfolio images uploaded'
                )}
              </div>
            )}
          </div>

          {/* Certifications/Documents */}
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
                        <span className="text-brand-500">📄</span>
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

      {/* Contact & Social Links Card */}
      <Card className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Contact & Social Links
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Additional ways for customers to reach you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* WhatsApp */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              WhatsApp Number
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={tempData.whatsappNumber}
                onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                placeholder="+91 XXXXXXXXXX"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {profileData.whatsappNumber || 'Not provided'}
              </div>
            )}
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Website URL
            </label>
            {isEditing ? (
              <input
                type="url"
                value={tempData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                placeholder="https://yourwebsite.com"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {profileData.websiteUrl ? (
                  <a href={profileData.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600">
                    {profileData.websiteUrl}
                  </a>
                ) : (
                  'Not provided'
                )}
              </div>
            )}
          </div>

          {/* Instagram */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Instagram Handle
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.instagramHandle}
                onChange={(e) => handleInputChange('instagramHandle', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                placeholder="@yourhandle"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {profileData.instagramHandle || 'Not provided'}
              </div>
            )}
          </div>

          {/* Facebook */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Facebook Page
            </label>
            {isEditing ? (
              <input
                type="url"
                value={tempData.facebookPage}
                onChange={(e) => handleInputChange('facebookPage', e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                placeholder="https://facebook.com/yourpage"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {profileData.facebookPage ? (
                  <a href={profileData.facebookPage} target="_blank" rel="noopener noreferrer" className="text-brand-500 hover:text-brand-600">
                    {profileData.facebookPage}
                  </a>
                ) : (
                  'Not provided'
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};



export default Editor;