import React from 'react';
import Card from './EditorCard';

const ContactSocialCard = ({
  isEditing,
  tempData,
  profileData,
  handleInputChange,
}) => (
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
);

export default ContactSocialCard;
