import React, { useState } from 'react';
import { useLandStore } from '../../store/useLandStore';


const AddProperty = () => {
  const { createLand, loading, error } = useLandStore();
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    type: '',
    area: '',
    plot: '',
    location: '',
    auctionStart: '',
    auctionEnd: '',
    landImg: '',
    blueprintImg: '',
    province: '',
    district: '',
    propertyType: '',
    googleLocation: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageInput = (e, field) => {
    const value = e.target.value;
    const urls = value.split(',').map(url => url.trim()).filter(url => url);
    setFormData((prev) => ({
      ...prev,
      [field]: urls,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    try {
      const dataToSubmit = {
        ...formData,
        area: parseFloat(formData.area),
        landImg: typeof formData.landImg === 'string' 
          ? formData.landImg.split(',').map(url => url.trim()).filter(url => url)
          : formData.landImg,
        blueprintImg: typeof formData.blueprintImg === 'string'
          ? formData.blueprintImg.split(',').map(url => url.trim()).filter(url => url)
          : formData.blueprintImg,
      };

      await createLand(dataToSubmit);
      setSuccess(true);
      
      setFormData({
        type: '',
        area: '',
        plot: '',
        location: '',
        auctionStart: '',
        auctionEnd: '',
        landImg: '',
        blueprintImg: '',
        province: '',
        district: '',
        propertyType: '',
        googleLocation: '',
      });

      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to create property:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Add New Property</h1>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 font-medium">Property added successfully!</p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auction Type <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select auction type</option>
                <option value="credit">Credit</option>
                <option value="nba">NBA</option>
                <option value="banking assets">Banking Assets</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select property type</option>
                <option value="land">Land</option>
                <option value="building">Building</option>
                <option value="land/building">Land/Building</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Area (sq. ft.) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter area in square feet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plot Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="plot"
                value={formData.plot}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter plot number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province <span className="text-red-500">*</span>
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select province</option>
                <option value="Koshi">Koshi</option>
                <option value="Madhesh">Madhesh</option>
                <option value="Bagmati">Bagmati</option>
                <option value="Gandaki">Gandaki</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Karnali">Karnali</option>
                <option value="Sudurpaschim">Sudurpaschim</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                District <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter district name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter detailed location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Google Maps Link <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="googleLocation"
                value={formData.googleLocation}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://maps.google.com/..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auction Start <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="auctionStart"
                  value={formData.auctionStart}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auction End <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="auctionEnd"
                  value={formData.auctionEnd}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Land Images (URLs)
              </label>
              <textarea
                name="landImg"
                value={formData.landImg}
                onChange={(e) => handleImageInput(e, 'landImg')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter image URLs separated by commas&#10;Example: https://example.com/image1.jpg, https://example.com/image2.jpg"
              />
              <p className="mt-1 text-xs text-gray-500">Separate multiple URLs with commas</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blueprint Images (URLs)
              </label>
              <textarea
                name="blueprintImg"
                value={formData.blueprintImg}
                onChange={(e) => handleImageInput(e, 'blueprintImg')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter blueprint URLs separated by commas&#10;Example: https://example.com/blueprint1.jpg"
              />
              <p className="mt-1 text-xs text-gray-500">Separate multiple URLs with commas</p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary1 text-white py-3 px-6 rounded-md font-medium hover:text-primary2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Adding Property...' : 'Add Property'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;