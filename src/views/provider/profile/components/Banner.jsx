import React, { useRef } from "react";
import { MdEdit, MdCameraAlt } from "react-icons/md";
import Card from "components/card";

const Banner = ({ profileData, onImageUpload }) => {
  const avatarInputRef = useRef(null);
  const bannerInputRef = useRef(null);

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
        style={{ backgroundImage: `url(${profileData.banner})` }}
        onClick={handleBannerClick}
      >
        {/* Banner edit overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-xl transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2 text-white">
            <MdCameraAlt className="text-xl" />
            <span className="text-sm font-medium">Edit Banner</span>
          </div>
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
            src={profileData.avatar} 
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
        <p className="text-base font-normal text-gray-600">{profileData.role}</p>
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