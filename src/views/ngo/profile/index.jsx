import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "components/card";
import { useNgoProfile } from "context/NgoProfileContext";
import { MdEdit, MdLocationOn, MdVerified } from "react-icons/md";
import {
  getPreviewUrl,
  normalizePortfolioImages,
} from "views/provider/profile/components/editorUtils";

const NgoProfileOverview = () => {
  const navigate = useNavigate();
  const { ngoData } = useNgoProfile();
  const logoSrc = getPreviewUrl(ngoData.logo);
  const gallery = normalizePortfolioImages(ngoData.images)
    .map(getPreviewUrl)
    .filter(Boolean);

  return (
    <div className="w-full space-y-6">
      <Card extra="p-6 rounded-2xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-100">
              {logoSrc ? (
                <img src={logoSrc} alt={ngoData.name} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gray-100" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-700 dark:text-white flex items-center gap-2">
                {ngoData.name}
                {ngoData.is_verified && <MdVerified className="text-green-500" />}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">Founded by {ngoData.founder}</p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <MdLocationOn /> {ngoData.city}, {ngoData.state}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/ngo/editor")}
            className="linear flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
          >
            <MdEdit className="text-lg" />
            Edit Profile
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-200 leading-6">{ngoData.description}</p>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card extra="p-6 rounded-2xl lg:col-span-2">
          <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-3">Gallery</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
            {gallery.map((img, idx) => (
              <div key={idx} className="h-28 w-full overflow-hidden rounded-xl bg-gray-100">
                <img src={img} alt={`NGO ${idx}`} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </Card>

        <Card extra="p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-navy-700 dark:text-white mb-3">Stats</h3>
          <div className="space-y-2 text-sm font-medium text-navy-700 dark:text-white">
            <div className="flex items-center justify-between">
              <span>Total Funds Raised</span>
              <span>Rs. {ngoData.total_funds_raised?.toLocaleString?.() || ngoData.total_funds_raised}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Campaigns</span>
              <span>{ngoData.total_campaigns}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NgoProfileOverview;
