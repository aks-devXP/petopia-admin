import React, { useState, useEffect, useCallback } from 'react';
import { MdEdit } from "react-icons/md";
import { useParams, useNavigate } from 'react-router-dom';

import Card from './Card';
import ImageUploadCard from './ImageUploadCard';
import EditableList from './EditableList';
import RatingEditor from './RatingEditor';
import { request } from '../../../../utils/api';

// Default template for creating a new breed
const DEFAULT_BREED = {
  breed: '',
  species: '',
  slug: '',
  general_info: {
    breedGroup: '',
    description: '',
    temperament: '',
    height: '',
    weight: '',
    lifeExpectancy: ''
  },
  ratings: {
    energyLevel: 3,
    vocalizationLevel: 3,
    drooling: 3,
    shedding: 3,
    groomingNeeds: 3,
    trainability: 3,
    compatibilityWithKids: 3,
    compatibilityWithOtherPets: 3,
    apartmentSuitability: 3,
    canStayAlone: 3,
    familyFriendly: 3,
    warmWeatherSuitability: 3,
    coldWeatherSuitability: 3,
  },
  physical_characteristics: {
    ears: '', head: '', fur: '', body: '', tail: ''
  },
  history: [],
  care: { exercise: '', grooming: '', training: '' },
  diet: { recommended: [], notRecommended: [] },
  health: { commonIssues: [], symptomsToWatch: [], preventiveTips: [] },
  owner_tips: [],
  images: { primary: '', secondary: '' }
};

const BreedInfoEditor = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(slug === 'new');
  const [data, setData] = useState(null);
  const [tempData, setTempData] = useState(null);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(true);

  const loadBreedData = useCallback(async () => {
    // Creation mode: initialize with defaults and skip fetch
    if (slug === 'new') {
      setData(null);
      setTempData(DEFAULT_BREED);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const breed = await request(`/api/breeds/${slug}`);
      setData(breed);
      setTempData(breed);
    } catch (e) {
      setErr(e.message || 'Failed to load breed');
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadBreedData();
  }, [loadBreedData]);

  // User-friendly labels for specific rating fields
  const RATING_LABELS = {
    vocalizationLevel: 'Noise Level',
  };

  const handleInputChange = (field, value, section = null) => {
    if (section) {
      setTempData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setTempData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Update item inside a top-level array field
  const handleArrayChange = (field, index, value) => {
    setTempData((prev) => ({
      ...prev,
      [field]: prev?.[field]?.map((item, i) => (i === index ? value : item)) || [],
    }));
  };

  // Update item inside a nested array (e.g., diet.recommended)
  const handleNestedArrayChange = (section, field, index, value) => {
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: prev?.[section]?.[field]?.map((item, i) => (i === index ? value : item)) || [],
      },
    }));
  };

  const addArrayItem = (field, defaultValue = "") => {
    setTempData((prev) => ({
      ...prev,
      [field]: [...(prev?.[field] || []), defaultValue],
    }));
  };

  const addNestedArrayItem = (section, field, defaultValue = "") => {
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev?.[section]?.[field] || []), defaultValue],
      },
    }));
  };

  const removeArrayItem = (field, index) => {
    setTempData((prev) => ({
      ...prev,
      [field]: (prev?.[field] || []).filter((_, i) => i !== index),
    }));
  };

  const removeNestedArrayItem = (section, field, index) => {
    setTempData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: (prev?.[section]?.[field] || []).filter((_, i) => i !== index),
      },
    }));
  };

  // Local image picker with preview; optionally integrate server upload later
  const handleImageUpload = (imgType) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      if (!data?.id) {
        const previewUrl = URL.createObjectURL(file);
        setTempData((prev) => ({
          ...prev,
          images: { ...(prev?.images || {}), [imgType]: previewUrl },
        }));
        setErr('Save the breed first, then upload images.');
        return;
      }

      try {
        const form = new FormData();
        form.append('image', file);
        const res = await request(`/api/breeds/${data.id}/images?type=${imgType}`, {
          method: 'PATCH',
          body: form,
        });
        if (res?.images) {
          setTempData((prev) => ({ ...prev, images: res.images }));
          setErr('');
        }
      } catch (e) {
        setErr(e.message || 'Failed to upload image');
      }
    };
    input.click();
  };

  const handleSave = async () => {
    try {
      // Basic client-side validation to avoid 500s on required fields
      if (!tempData?.breed?.trim() || !tempData?.species?.trim()) {
        setErr('Breed and Species are required.');
        return;
      }
      // Do not send images in the main payload; images are handled via PATCH /images
      const { images: _images, ...payload } = tempData || {};
      let updatedBreed;
      if (data && data.id) {
        // Update existing breed
        updatedBreed = await request(`/api/breeds/${data.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Create new breed
        updatedBreed = await request(`/api/breeds`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      setData(updatedBreed);
      setTempData(updatedBreed);
      setIsEditing(false);

      // If we just created a new one, navigate to its slug route
      if (slug === 'new' && updatedBreed?.slug) {
        navigate(`/admin/breed-info/${updatedBreed.slug}`, { replace: true });
      }
    } catch (e) {
      setErr(e.message || 'Failed to save breed');
    }
  };

  const handleCancel = () => {
    setTempData(data);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (loading) return <div>Loading...</div>;
  if (err) return <div>{err}</div>;

  return (
    <div className="space-y-6 p-6">
      {err ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700 text-sm">
          {err}
        </div>
      ) : null}
      
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
              General Information
            </h5>
            <p className="mt-1 text-sm font-medium text-gray-600">
              Update basic pet details
            </p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="linear flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300"
              >
                <MdEdit className="text-lg" />
                Edit
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
          {/* Breed and Species */}
          {['breed', 'species'].map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-navy-700 dark:text-white">
                {key.charAt(0).toUpperCase() + key.slice(1)} *
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                  required
                />
              ) : (
                <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                  {tempData[key]}
                </div>
              )}
            </div>
          ))}
          {/* Images Section */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['primary', 'secondary'].map((imgType) => (
                <ImageUploadCard
                  key={imgType}
                  src={tempData.images[imgType]}
                  onChange={() => handleImageUpload(imgType)}
                  label={`${imgType.charAt(0).toUpperCase() + imgType.slice(1)} Image`}
                  isEditing={isEditing}
                />
              ))}
            </div>
          </div>
          {/* General Information */}
          {Object.keys(tempData.general_info).map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-navy-700 dark:text-white">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={tempData.general_info[key]}
                  onChange={(e) => handleInputChange(key, e.target.value, 'general_info')}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                />
              ) : (
                <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white">
                  {tempData.general_info[key]}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Ratings Card */}
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Ratings
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Rate characteristics (1-5 paws)
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Object.keys(tempData.ratings).map((key) => (
            <RatingEditor
              key={key}
              value={tempData.ratings[key]}
              onChange={(value) => handleInputChange(key, value, 'ratings')}
              label={RATING_LABELS[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              isEditing={isEditing}
            />
          ))}
        </div>
      </Card>

      {/* Physical Characteristics Card */}
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Physical Characteristics
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Describe physical traits
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Object.keys(tempData.physical_characteristics).map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-navy-700 dark:text-white">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              {isEditing ? (
                <textarea
                  value={tempData.physical_characteristics[key]}
                  onChange={(e) => handleInputChange(key, e.target.value, 'physical_characteristics')}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                  rows="3"
                />
              ) : (
                <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white min-h-[80px]">
                  {tempData.physical_characteristics[key]}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* History Card */}
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            History
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Add or edit historical facts
          </p>
        </div>
        <EditableList
          items={tempData.history}
          onChange={(index, value) => handleArrayChange('history', index, value)}
          onAdd={() => addArrayItem('history', '')}
          onRemove={(index) => removeArrayItem('history', index)}
          isEditing={isEditing}
          label="History Fact"
        />
      </Card>

      {/* Care Card */}
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Care Information
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Provide care guidelines
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {Object.keys(tempData.care).map((key) => (
            <div key={key} className="space-y-2">
              <label className="text-sm font-medium text-navy-700 dark:text-white">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              {isEditing ? (
                <textarea
                  value={tempData.care[key]}
                  onChange={(e) => handleInputChange(key, e.target.value, 'care')}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400"
                  rows="3"
                />
              ) : (
                <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-navy-700 dark:border-navy-600 dark:bg-navy-700 dark:text-white min-h-[80px]">
                  {tempData.care[key]}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Diet Card */}
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Diet Recommendations
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Manage recommended and non-recommended foods
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {['recommended', 'notRecommended'].map((key) => (
            <EditableList
              key={key}
              items={tempData.diet[key]}
              onChange={(index, value) => handleNestedArrayChange('diet', key, index, value)}
              onAdd={() => addNestedArrayItem('diet', key, '')}
              onRemove={(index) => removeNestedArrayItem('diet', key, index)}
              isEditing={isEditing}
              label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            />
          ))}
        </div>
      </Card>

      {/* Health Card */}
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Health Information
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Manage health-related information
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {['commonIssues', 'symptomsToWatch', 'preventiveTips'].map((key) => (
            <EditableList
              key={key}
              items={tempData.health[key]}
              onChange={(index, value) => handleNestedArrayChange('health', key, index, value)}
              onAdd={() => addNestedArrayItem('health', key, '')}
              onRemove={(index) => removeNestedArrayItem('health', key, index)}
              isEditing={isEditing}
              label={key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            />
          ))}
        </div>
      </Card>

      {/* Owner Tips Card */}
      <Card className="rounded-2xl bg-white bg-clip-border p-6 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
        <div className="mb-6">
          <h5 className="text-left text-2xl font-bold leading-9 text-navy-700 dark:text-white">
            Owner Tips
          </h5>
          <p className="mt-1 text-sm font-medium text-gray-600">
            Add or edit tips for pet owners
          </p>
        </div>
        <EditableList
          items={tempData.owner_tips}
          onChange={(index, value) => handleArrayChange('owner_tips', index, value)}
          onAdd={() => addArrayItem('owner_tips', '')}
          onRemove={(index) => removeArrayItem('owner_tips', index)}
          isEditing={isEditing}
          label="Owner Tip"
        />
      </Card>
    </div>
  );
};

export default BreedInfoEditor;
