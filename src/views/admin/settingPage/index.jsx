import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../../utils/api';
import { MdEdit, MdDelete } from "react-icons/md";
import SearchIcon from 'components/icons/SearchIcon';
import Card from './components/Card';

const BreedListPage = () => {
  const [breeds, setBreeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');
  const [deletingId, setDeletingId] = useState('');

  useEffect(() => {
    const fetchBreeds = async () => {
      setLoading(true);
      setErr('');
      try {
        const { data } = await request('/api/breeds');
        setBreeds(data || []);
      } catch (e) {
        setErr(e.message || 'Failed to load breeds');
      } finally {
        setLoading(false);
      }
    };
    fetchBreeds();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this breed?')) {
      try {
        setErr('');
        setDeletingId(id);
        await request(`/api/breeds/${id}`, { method: 'DELETE' });
        setBreeds((prev) => prev.filter((breed) => breed.id !== id));
      } catch (e) {
        setErr(e.message || 'Failed to delete breed');
      } finally {
        setDeletingId('');
      }
    }
  };

  const filteredBreeds = breeds.filter((breed) => {
    const q = searchTerm.toLowerCase();
    return (
      breed.breed.toLowerCase().includes(q) ||
      (breed.species || '').toLowerCase().includes(q)
    );
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6 p-6">
      {err ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-3 text-red-700 text-sm">
          {err}
        </div>
      ) : null}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-6">
        <div className="relative w-full sm:max-w-md">
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400 dark:text-gray-300">
            <SearchIcon className="h-5 w-5" />
          </span>
          <input
            type="text"
            placeholder="Search breeds or species..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-white pl-12 pr-4 py-2 text-sm font-medium text-navy-700 outline-none focus:border-brand-500 dark:border-navy-600 dark:bg-navy-800 dark:text-white dark:focus:border-brand-400 placeholder-gray-400 dark:placeholder-gray-300"
          />
        </div>
        <Link to="/admin/breed-info/new" className="px-4 py-2 rounded-full bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300">
          Add New Breed
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBreeds.map(breed => (
          <Card key={breed.id} className="rounded-2xl bg-white bg-clip-border p-6 shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none">
            <div className="flex justify-between items-center">
              <h5 className="text-xl font-bold">{breed.breed}</h5>
              <div className="flex space-x-3">
                <Link to={`/admin/breed-info/${breed.slug}`} className="text-blue-500">
                  <MdEdit />
                </Link>
                <button
                  onClick={() => handleDelete(breed.id)}
                  className={`text-red-500 ${deletingId === breed.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={deletingId === breed.id}
                  title={deletingId === breed.id ? 'Deleting…' : 'Delete'}
                >
                  <MdDelete />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-500">{breed.species}</p>
            <div className="mt-2">
              <div className="h-40 w-full rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img
                  src={breed.images.primary || "/logo_transparent.png"}
                  alt={breed.breed}
                  className="max-h-full w-auto object-contain"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BreedListPage;
