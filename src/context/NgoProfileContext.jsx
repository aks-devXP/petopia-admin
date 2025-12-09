import React, { createContext, useContext, useState } from "react";

const NgoProfileContext = createContext(null);

const defaultNgoData = {
  name: "PetCare Trust",
  founder: "Ananya Rao",
  email: "contact@petcaretrust.org",
  password: "********",
  contact_no: "+91 98111 22334",
  description:
    "Non-profit focused on animal welfare, rescues, and community outreach. Running vaccination camps and adoption drives across major cities.",
  social_media_links: {
    instagram: "https://instagram.com/petcaretrust",
    facebook: "https://facebook.com/petcaretrust",
    twitter: "https://twitter.com/petcaretrust",
  },
  website: "https://petcaretrust.org",
  address: "12 Harmony Lane, Sector 21",
  city: "Bengaluru",
  state: "Karnataka",
  verification_docs: {
    registration: "https://example.com/documents/registration.pdf",
    pan: "https://example.com/documents/pan.pdf",
  },
  is_verified: true,
  logo: "https://images.unsplash.com/photo-1566263281161-04c5abe77cce?w=400&h=400&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
  ],
  activities: ["Animal Rescue", "Vaccination Camps", "Adoption Drives"],
  facilities: ["Shelter", "Medical Aid", "Volunteer Training"],
  established_in: 2012,
  total_funds_raised: 2784000,
  total_campaigns: 48,
};

export const NgoProfileProvider = ({ children }) => {
  const [ngoData, setNgoData] = useState(defaultNgoData);

  const updateNgoData = (newData) => setNgoData((prev) => ({ ...prev, ...newData }));

  return (
    <NgoProfileContext.Provider value={{ ngoData, updateNgoData }}>
      {children}
    </NgoProfileContext.Provider>
  );
};

export const useNgoProfile = () => {
  const ctx = useContext(NgoProfileContext);
  if (!ctx) throw new Error("useNgoProfile must be used within NgoProfileProvider");
  return ctx;
};
