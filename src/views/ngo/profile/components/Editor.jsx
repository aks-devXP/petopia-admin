import React, { useEffect, useMemo, useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdLocationOn, MdPublic, MdVerified } from "react-icons/md";
import EditorCard from "views/provider/profile/components/EditorCard";
import UploadSlot from "views/provider/profile/components/UploadSlot";
import {
  cleanupPreview,
  getPreviewUrl,
  normalizePortfolioImages,
} from "views/provider/profile/components/editorUtils";

const mapToList = (obj = {}) => {
  const entries = obj instanceof Map ? Array.from(obj.entries()) : Object.entries(obj);
  return entries.map(([key, value]) => ({ key, value }));
};

const listToMap = (list = []) =>
  list.reduce((acc, { key, value }) => {
    if (key) acc[key] = value;
    return acc;
  }, {});

const defaultNgoData = {
  name: "",
  founder: "",
  email: "",
  password: "",
  contact_no: "",
  description: "",
  social_media_links: {},
  website: "",
  address: "",
  city: "",
  state: "",
  verification_docs: {},
  is_verified: false,
  logo: "",
  images: [],
  activities: [],
  facilities: [],
  established_in: "",
  total_funds_raised: 0,
  total_campaigns: 0,
};

const buildStateFromSource = (source = {}) => {
  const merged = { ...defaultNgoData, ...source };
  return {
    ...merged,
    logo: merged.logo || null,
    images: normalizePortfolioImages(merged.images),
  };
};

const NgoEditor = ({ ngoData, onUpdate }) => {
  const mergedData = useMemo(() => buildStateFromSource(ngoData), [ngoData]);

  const [isEditing, setIsEditing] = useState(false);
  const [tempData, setTempData] = useState(mergedData);
  const [socialLinks, setSocialLinks] = useState(
    mapToList(mergedData.social_media_links)
  );
  const [verificationDocs, setVerificationDocs] = useState(
    mapToList(mergedData.verification_docs)
  );
  const [imagePreviews, setImagePreviews] = useState({
    logo: getPreviewUrl(mergedData.logo),
    images: normalizePortfolioImages(mergedData.images).map(getPreviewUrl),
  });

  useEffect(() => {
    if (!isEditing) {
      setTempData(mergedData);
      setSocialLinks(mapToList(mergedData.social_media_links));
      setVerificationDocs(mapToList(mergedData.verification_docs));
      setImagePreviews({
        logo: getPreviewUrl(mergedData.logo),
        images: normalizePortfolioImages(mergedData.images).map(getPreviewUrl),
      });
    }
  }, [mergedData, isEditing]);

  useEffect(
    () => () => {
      cleanupPreview(imagePreviews.logo);
      imagePreviews.images?.forEach(cleanupPreview);
    },
    [imagePreviews]
  );

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setTempData(mergedData);
    setSocialLinks(mapToList(mergedData.social_media_links));
    setVerificationDocs(mapToList(mergedData.verification_docs));
    setImagePreviews({
      logo: getPreviewUrl(mergedData.logo),
      images: normalizePortfolioImages(mergedData.images).map(getPreviewUrl),
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    const payload = {
      ...tempData,
      images: normalizePortfolioImages(tempData.images),
      social_media_links: listToMap(socialLinks),
      verification_docs: listToMap(verificationDocs),
    };
    setTempData(payload);
    onUpdate?.(payload);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setTempData((prev) => {
      const next = [...(prev[field] || [])];
      next[index] = value;
      return { ...prev, [field]: next };
    });
  };

  const addArrayItem = (field, defaultValue = "") => {
    setTempData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultValue],
    }));
  };

  const removeArrayItem = (field, index) => {
    setTempData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }));
  };

  const updatePair = (setter) => (index, key, value) => {
    setter((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item))
    );
  };

  const addPair = (setter) => () =>
    setter((prev) => [...prev, { key: "", value: "" }]);

  const removePair = (setter) => (index) =>
    setter((prev) => prev.filter((_, i) => i !== index));

  const openFilePicker = (field, index) => {
    if (!isEditing) return;

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (field === "images") {
        setTempData((prev) => {
          const current = normalizePortfolioImages(prev.images);
          const next = [...current];
          if (typeof index === "number" && index < next.length) {
            next[index] = file;
          } else if (next.length < 4) {
            next.push(file);
          }
          return { ...prev, images: next };
        });

        setImagePreviews((prev) => {
          const previews = [...normalizePortfolioImages(prev.images)];
          const newPreview = URL.createObjectURL(file);
          if (typeof index === "number" && index < previews.length) {
            cleanupPreview(previews[index]);
            previews[index] = newPreview;
          } else if (previews.length < 4) {
            previews.push(newPreview);
          }
          return { ...prev, images: previews.slice(0, 4) };
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
    if (field === "images") {
      setTempData((prev) => {
        const next = normalizePortfolioImages(prev.images).filter(
          (_, i) => i !== index
        );
        return { ...prev, images: next };
      });
      setImagePreviews((prev) => {
        const previews = normalizePortfolioImages(prev.images);
        const [removed] = previews.splice(index, 1);
        cleanupPreview(removed);
        return { ...prev, images: previews };
      });
      return;
    }

    setTempData((prev) => ({ ...prev, [field]: null }));
    setImagePreviews((prev) => {
      cleanupPreview(prev[field]);
      return { ...prev, [field]: "" };
    });
  };

  const updateSocial = updatePair(setSocialLinks);
  const addSocial = addPair(setSocialLinks);
  const removeSocial = removePair(setSocialLinks);

  const updateDoc = updatePair(setVerificationDocs);
  const addDoc = addPair(setVerificationDocs);
  const removeDoc = removePair(setVerificationDocs);

  const fundsRaised = Number(tempData.total_funds_raised || 0);
  return (
    <div className="space-y-6">
      <EditorCard className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold text-navy-700 dark:text-white">
              NGO Profile
            </h3>
            <p className="text-sm text-gray-500">Manage NGO details and media</p>
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
                  className="linear flex items-center px-4 py-2 text-sm font-semibold text-red-400 transition duration-200 hover:text-red-500 hover:dark:text-red-500"
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

        <div className="mt-6 grid gap-6 md:grid-cols-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Logo
            </label>
            <UploadSlot
              src={imagePreviews.logo}
              onAdd={() => openFilePicker("logo")}
              onDelete={() => handleImageRemove("logo")}
              shape="circle"
              disabled={!isEditing}
              label="NGO Logo"
            />
          </div>
          <div className="md:col-span-4 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-navy-700 dark:text-white">
                Gallery (up to 4)
              </label>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {(tempData.images?.length || 0)}/4
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <UploadSlot
                  key={index}
                  src={imagePreviews.images?.[index]}
                  onAdd={() => openFilePicker("images", index)}
                  onDelete={() => handleImageRemove("images", index)}
                  disabled={!isEditing}
                  label={`Gallery image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </EditorCard>

      <EditorCard className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              NGO Name *
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.name}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Founder *
            </label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.founder}
                onChange={(e) => handleInputChange("founder", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.founder}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Email *
            </label>
            {isEditing ? (
              <input
                type="email"
                value={tempData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.email}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Contact Number *
            </label>
            {isEditing ? (
              <input
                type="tel"
                value={tempData.contact_no}
                onChange={(e) => handleInputChange("contact_no", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.contact_no}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Website
            </label>
            {isEditing ? (
              <input
                type="url"
                value={tempData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.website ? (
                  <a
                    href={tempData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-500 hover:text-brand-600"
                  >
                    {tempData.website}
                  </a>
                ) : (
                  "Not provided"
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Established In
            </label>
            {isEditing ? (
              <input
                type="number"
                value={tempData.established_in}
                onChange={(e) => handleInputChange("established_in", Number(e.target.value))}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.established_in}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={tempData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                rows="4"
              />
            ) : (
              <div className="w-full min-h-[100px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.description}
              </div>
            )}
          </div>

          <div className="space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-navy-600 dark:bg-navy-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-navy-700 dark:text-white">Verified</span>
              {isEditing ? (
                <input
                  type="checkbox"
                  checked={tempData.is_verified}
                  onChange={(e) => handleInputChange("is_verified", e.target.checked)}
                  className="h-4 w-4 text-brand-500"
                />
              ) : (
                <MdVerified className={`text-xl ${tempData.is_verified ? "text-green-500" : "text-gray-400"}`} />
              )}
            </div>
            <div className="text-sm font-medium text-navy-700 dark:text-white">
              <p>Total Funds Raised</p>
              {isEditing ? (
                <input
                  type="number"
                  value={tempData.total_funds_raised}
                  onChange={(e) => handleInputChange("total_funds_raised", Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                />
              ) : (
                <p className="text-base font-semibold">Rs. {fundsRaised.toLocaleString()}</p>
              )}
            </div>
            <div className="text-sm font-medium text-navy-700 dark:text-white">
              <p>Total Campaigns</p>
              {isEditing ? (
                <input
                  type="number"
                  value={tempData.total_campaigns}
                  onChange={(e) => handleInputChange("total_campaigns", Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white"
                />
              ) : (
                <p className="text-base font-semibold">{tempData.total_campaigns}</p>
              )}
            </div>
          </div>
        </div>
      </EditorCard>
      <EditorCard className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <h4 className="mb-4 text-lg font-bold text-navy-700 dark:text-white">Address</h4>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-2 lg:col-span-3">
            <label className="flex items-center gap-2 text-sm font-medium text-navy-700 dark:text-white">
              <MdLocationOn />
              Address *
            </label>
            {isEditing ? (
              <textarea
                value={tempData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                rows="2"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.address}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">City *</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.city}
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">State *</label>
            {isEditing ? (
              <input
                type="text"
                value={tempData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
              />
            ) : (
              <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                {tempData.state}
              </div>
            )}
          </div>
        </div>
      </EditorCard>

      <EditorCard className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-navy-700 dark:text-white">
              <MdPublic />
              Social Media Links
            </label>
            {isEditing ? (
              <div className="space-y-3">
                {socialLinks.map((link, index) => (
                  <div key={index} className="grid grid-cols-5 gap-3">
                    <input
                      type="text"
                      value={link.key}
                      onChange={(e) => updateSocial(index, "key", e.target.value)}
                      className="col-span-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                      placeholder="Platform"
                    />
                    <input
                      type="url"
                      value={link.value}
                      onChange={(e) => updateSocial(index, "value", e.target.value)}
                      className="col-span-3 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                      placeholder="https://..."
                    />
                    <button
                      onClick={() => removeSocial(index)}
                      className="flex items-center justify-center text-red-500 transition-colors hover:text-red-700"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addSocial}
                  className="flex items-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
                >
                  <MdAdd />
                  Add Link
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {socialLinks.length > 0 ? (
                  socialLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white"
                    >
                      <span className="capitalize">{link.key}</span>
                      <a
                        href={link.value}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-500 hover:text-brand-600"
                      >
                        View
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No social links added</p>
                )}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Verification Documents
            </label>
            {isEditing ? (
              <div className="space-y-3">
                {verificationDocs.map((doc, index) => (
                  <div key={index} className="grid grid-cols-5 gap-3">
                    <input
                      type="text"
                      value={doc.key}
                      onChange={(e) => updateDoc(index, "key", e.target.value)}
                      className="col-span-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                      placeholder="Document"
                    />
                    <input
                      type="url"
                      value={doc.value}
                      onChange={(e) => updateDoc(index, "value", e.target.value)}
                      className="col-span-3 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                      placeholder="https://..."
                    />
                    <button
                      onClick={() => removeDoc(index)}
                      className="flex items-center justify-center text-red-500 transition-colors hover:text-red-700"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addDoc}
                  className="flex items-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
                >
                  <MdAdd />
                  Add Document
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {verificationDocs.length > 0 ? (
                  verificationDocs.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white"
                    >
                      <span className="capitalize">{doc.key}</span>
                      <a
                        href={doc.value}
                        target="_blank"
                        rel="noreferrer"
                        className="text-brand-500 hover:text-brand-600"
                      >
                        View
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No documents uploaded</p>
                )}
              </div>
            )}
          </div>
        </div>
      </EditorCard>
      <EditorCard className="rounded-[20px] bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Activities
            </label>
            {isEditing ? (
              <div className="space-y-3">
                {(tempData.activities || []).map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => handleArrayChange("activities", index, e.target.value)}
                      className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                      placeholder="e.g., Adoption Drives"
                    />
                    <button
                      onClick={() => removeArrayItem("activities", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("activities", "")}
                  className="flex items-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
                >
                  <MdAdd />
                  Add Activity
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(tempData.activities || []).map((activity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-800 dark:text-brand-200"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-navy-700 dark:text-white">
              Facilities
            </label>
            {isEditing ? (
              <div className="space-y-3">
                {(tempData.facilities || []).map((facility, index) => (
                  <div key={index} className="flex gap-3">
                    <input
                      type="text"
                      value={facility}
                      onChange={(e) => handleArrayChange("facilities", index, e.target.value)}
                      className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                      placeholder="e.g., Medical Aid"
                    />
                    <button
                      onClick={() => removeArrayItem("facilities", index)}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem("facilities", "")}
                  className="flex items-center gap-2 text-sm font-medium text-brand-500 transition-colors hover:text-brand-600"
                >
                  <MdAdd />
                  Add Facility
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(tempData.facilities || []).map((facility, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200"
                  >
                    {facility}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </EditorCard>
    </div>
  );
};

export default NgoEditor;
