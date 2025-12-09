import React, { useState } from "react";
import Banner from "./components/Banner";
import Editor from "./components/Editor";

const ProfileOverview = () => {
  // Shared state for service provider profile
  const [profileData, setProfileData] = useState({
    // Basic Information
    profileImage:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@vetcare.com",
    phone: "+91 9876543210",
    serviceType: "vet",
    experienceLevel: "6-10 years",

    // Business Information
    businessName: "Happy Paws Veterinary Clinic",
    location: "Downtown District",
    fullAddress:
      "123 Main Street, Downtown District, Mumbai, Maharashtra 400001",
    basePrice: 85,
    pricingType: "consultation",
    availabilityStatus: "available",
    rating: 4.9,
    reviewCount: 127,

    // Professional Details
    bio: "Passionate veterinarian with over 8 years of experience in small animal care. Specialized in emergency medicine and surgical procedures. Committed to providing compassionate care for your beloved pets.",
    qualifications: [
      "Doctor of Veterinary Medicine (DVM) - Mumbai Veterinary College",
      "Certification in Small Animal Surgery",
      "Emergency & Critical Care Certificate",
    ],
    specializations: [
      "Emergency Medicine",
      "Small Animal Surgery",
      "Preventive Care",
      "Dental Care",
    ],
    servicesOffered: [
      "Health Checkups & Vaccinations",
      "Emergency Care",
      "Surgical Procedures",
      "Dental Cleaning",
      "Laboratory Diagnostics",
    ],
    workingHours: { start: "09:00", end: "18:00" },
    emergencyServices: true,

    // Portfolio
    portfolioImages: [
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1629903363682-89840f55397e?w=400&h=300&fit=crop",
    ],
    certificationDocuments: [
      { name: "DVM Certificate", url: "#" },
      { name: "Surgery Certification", url: "#" },
    ],

    // Contact & Social
    whatsappNumber: "+91 9876543210",
    websiteUrl: "https://happypawsvet.com",
    instagramHandle: "@happypawsvet",
    facebookPage: "https://facebook.com/happypawsvet",
  });

  // Function to update profile data
  const updateProfileData = (newData) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Function to handle image uploads
  const handleImageUpload = (file, type) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfileData({ [type]: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex w-full flex-col gap-5">
      <Banner profileData={profileData} onImageUpload={handleImageUpload} />
      <Editor
            profileData={profileData}
            onUpdateProfile={updateProfileData}
        />
    </div>
  );
};

export default ProfileOverview;
