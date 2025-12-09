import React, { useEffect, useState } from 'react';
import MediaCard from './MediaCard';
import BasicInfoCard from './BasicInfoCard';
import BusinessInfoCard from './BusinessInfoCard';
import ProfessionalDetailsCard from './ProfessionalDetailsCard';
import ContactSocialCard from './ContactSocialCard';
import { cleanupPreview, getPreviewUrl, normalizePortfolioImages } from './editorUtils';

const Editor = ({ profileData, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState({
    ...profileData,
    banner: profileData?.banner || null,
    profileImage: profileData?.profileImage || null,
    portfolioImages: normalizePortfolioImages(profileData?.portfolioImages),
  });
  const [imagePreviews, setImagePreviews] = useState({
    banner: getPreviewUrl(profileData?.banner),
    profileImage: getPreviewUrl(profileData?.profileImage),
    portfolioImages: normalizePortfolioImages(profileData?.portfolioImages).map(getPreviewUrl),
  });

  const serviceTypes = ['vet', 'groomer', 'trainer', 'caretaker', 'ngo'];
  const experienceLevels = ['1-2 years', '3-5 years', '6-10 years', '10+ years'];
  const availabilityOptions = ['Available', 'Busy', 'Unavailable'];

  const resetTempData = () => ({
    ...profileData,
    banner: profileData?.banner || null,
    profileImage: profileData?.profileImage || null,
    portfolioImages: normalizePortfolioImages(profileData?.portfolioImages),
  });

  // Update tempData when profileData changes
  useEffect(() => {
    if (!isEditing) {
      const nextTemp = resetTempData();
      setTempData(nextTemp);

      setImagePreviews((prev) => {
        cleanupPreview(prev.banner);
        cleanupPreview(prev.profileImage);
        prev.portfolioImages?.forEach(cleanupPreview);

        return {
          banner: getPreviewUrl(profileData?.banner),
          profileImage: getPreviewUrl(profileData?.profileImage),
          portfolioImages: normalizePortfolioImages(profileData?.portfolioImages).map(getPreviewUrl),
        };
      });
    }
  }, [profileData, isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(resetTempData());
  };

  const handleSave = () => {
    const limitedPortfolio = normalizePortfolioImages(tempData.portfolioImages);
    const payload = { ...tempData, portfolioImages: limitedPortfolio };
    setTempData(payload);
    onUpdateProfile(payload);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(resetTempData());
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item)),
    }));
  };

  const addArrayItem = (field, defaultValue = '') => {
    setTempData((prev) => ({
      ...prev,
      [field]: [...prev[field], defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setTempData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handlePasswordReset = () => {
    alert('Password reset email sent to your registered email address.');
  };

  const openFilePicker = (field, index) => {
    if (!isEditing) return;

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (field === 'portfolioImages') {
        setTempData((prev) => {
          const current = normalizePortfolioImages(prev.portfolioImages);

          if (typeof index === 'number' && index < current.length) {
            const updated = [...current];
            updated[index] = file;
            return { ...prev, portfolioImages: updated };
          }

          if (current.length >= 4) return prev;
          return { ...prev, portfolioImages: [...current, file] };
        });

        setImagePreviews((prev) => {
          const previews = [...normalizePortfolioImages(prev.portfolioImages)];
          const newPreview = URL.createObjectURL(file);

          if (typeof index === 'number' && index < previews.length) {
            cleanupPreview(previews[index]);
            previews[index] = newPreview;
          } else if (previews.length < 4) {
            previews.push(newPreview);
          }

          return { ...prev, portfolioImages: previews.slice(0, 4) };
        });

        return;
      }

      setTempData((prev) => ({ ...prev, [field]: file }));
      setImagePreviews((prev) => {
        cleanupPreview(prev[field]);
        return { ...prev, [field]: URL.createObjectURL(file) };
      });
    };
    fileInput.click();
  };

  const handleImageRemove = (field, index) => {
    if (field === 'portfolioImages') {
      setTempData((prev) => {
        const updated = normalizePortfolioImages(prev.portfolioImages).filter((_, i) => i !== index);
        return { ...prev, portfolioImages: updated };
      });

      setImagePreviews((prev) => {
        const previews = normalizePortfolioImages(prev.portfolioImages);
        const [removed] = previews.splice(index, 1);
        cleanupPreview(removed);
        return { ...prev, portfolioImages: previews };
      });
      return;
    }

    setTempData((prev) => ({ ...prev, [field]: null }));
    setImagePreviews((prev) => {
      cleanupPreview(prev[field]);
      return { ...prev, [field]: '' };
    });
  };

  return (
    <div className="space-y-6">
      <MediaCard
        isEditing={isEditing}
        tempData={tempData}
        imagePreviews={imagePreviews}
        openFilePicker={openFilePicker}
        handleImageRemove={handleImageRemove}
        handleEdit={handleEdit}
        handleCancel={handleCancel}
        handleSave={handleSave}
        handleArrayChange={handleArrayChange}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
        profileData={profileData}
      />

      <BasicInfoCard
        isEditing={isEditing}
        tempData={tempData}
        profileData={profileData}
        handleInputChange={handleInputChange}
        handlePasswordReset={handlePasswordReset}
        serviceTypes={serviceTypes}
        experienceLevels={experienceLevels}
      />

      <BusinessInfoCard
        isEditing={isEditing}
        tempData={tempData}
        profileData={profileData}
        handleInputChange={handleInputChange}
        availabilityOptions={availabilityOptions}
      />

      <ProfessionalDetailsCard
        isEditing={isEditing}
        tempData={tempData}
        profileData={profileData}
        handleInputChange={handleInputChange}
        handleArrayChange={handleArrayChange}
        addArrayItem={addArrayItem}
        removeArrayItem={removeArrayItem}
      />

      <ContactSocialCard
        isEditing={isEditing}
        tempData={tempData}
        profileData={profileData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default Editor;
