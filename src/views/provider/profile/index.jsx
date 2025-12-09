import React from "react";
import { useNavigate } from "react-router-dom";
import Banner from "./components/Banner";
import { useProviderProfile } from "context/ProviderProfileContext";

const ProfileOverview = () => {
  const navigate = useNavigate();
  const { profileData, updateProfileData } = useProviderProfile();

  const handleImageUpload = (file, type) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfileData({ [type]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditNavigate = () => navigate("/provider/profile/edit");

  return (
    <div className="flex w-full flex-col gap-5">
      <Banner
        profileData={profileData}
        onImageUpload={handleImageUpload}
        onEdit={handleEditNavigate}
      />
    </div>
  );
};

export default ProfileOverview;
