import React, { useEffect, useRef, useState } from "react";
import { MdEdit, MdCameraAlt, MdLocationOn } from "react-icons/md";
import Card from "components/card";

const resolveImage = (value) => {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (value instanceof File) return URL.createObjectURL(value);
  return "";
};

const Banner = ({ profileData, onImageUpload, onEdit }) => {
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const [bannerPreview, setBannerPreview] = useState(
    resolveImage(profileData.banner)
  );
  const [avatarPreview, setAvatarPreview] = useState(
    resolveImage(profileData.avatar || profileData.profileImage)
  );

  useEffect(() => {
    setBannerPreview((prev) => {
      if (prev && prev.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return resolveImage(profileData.banner);
    });
  }, [profileData.banner]);

  useEffect(() => {
    setAvatarPreview((prev) => {
      if (prev && prev.startsWith("blob:")) {
        URL.revokeObjectURL(prev);
      }
      return resolveImage(profileData.avatar || profileData.profileImage);
    });
  }, [profileData.avatar, profileData.profileImage]);

  useEffect(
    () => () => {
      if (bannerPreview && bannerPreview.startsWith("blob:")) {
        URL.revokeObjectURL(bannerPreview);
      }
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    },
    [avatarPreview, bannerPreview]
  );

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file, 'avatar');
    }
  };

  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onImageUpload(file, 'banner');
    }
  };

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover group cursor-pointer"
        style={{ backgroundImage: `url(${bannerPreview})` }}
        onClick={handleBannerClick}
      >
        {/* Banner edit overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 text-white">
            <MdCameraAlt className="text-xl" />
            <span className="text-sm font-medium">Edit Banner</span>
          </div>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-3">
          <div className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-navy-700 shadow-sm">
            {profileData.rating ? `Rating: ${profileData.rating} (${profileData.reviewCount || 0})` : 'Unrated'}
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="rounded-lg bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md hover:bg-brand-600"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Hidden file input for banner */}
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          onChange={handleBannerChange}
          className="hidden"
        />

        {/* Profile Avatar */}
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700 group/avatar cursor-pointer">
          <img 
            className="h-full w-full rounded-full object-cover" 
            src={avatarPreview} 
            alt="Profile" 
            onClick={(e) => {
              e.stopPropagation();
              handleAvatarClick();
            }}
          />
          
          {/* Avatar edit icon */}
          <div 
            className="absolute -bottom-1 -right-1 bg-brand-500 hover:bg-brand-600 rounded-full p-1.5 shadow-lg transition-colors duration-200 group-hover/avatar:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              handleAvatarClick();
            }}
          >
            <MdEdit className="text-white text-xs" />
          </div>

          {/* Hidden file input for avatar */}
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {profileData.firstName} {profileData.lastName}
        </h4>
        <p className="text-base font-normal text-gray-600">
          {profileData.role || profileData.serviceType || 'Service Provider'}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-navy-700">
          {profileData.serviceType && (
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">
              {profileData.serviceType.charAt(0).toUpperCase() + profileData.serviceType.slice(1)}
            </span>
          )}
          {profileData.location && (
            <span className="rounded-full bg-white px-3 py-1 shadow-sm flex items-center gap-1">
              <MdLocationOn className="text-[12px]" />
              {profileData.location}
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {profileData.posts}
          </p>
          <p className="text-sm font-normal text-gray-600">Posts</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {profileData.users}
          </p>
          <p className="text-sm font-normal text-gray-600">Users</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {profileData.providers}
          </p>
          <p className="text-sm font-normal text-gray-600">Providers</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
