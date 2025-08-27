import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLandStore } from '../../store/useLandStore';
import CardItem from '../components/CardItem';
import { calculateCountdown } from '../assets/helper';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MdFilterList } from "react-icons/md";

const FilteredCardsPage = () => {
  const { searchType, value } = useParams();
  const { lands, loading, error, fetchLands, filters, setFilters, resetFilters } = useLandStore();
  const [filteredCards, setFilteredCards] = useState([]);
  const [countdownTimes, setCountdownTimes] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    auctionType: '',
    propertyType: '',
    province: '',
    district: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 10;
  const [showFilters, setShowFilters] = useState(false); // State to show/hide filters on small screen

  // Function to handle filter changes (but don't apply them yet)
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // Apply filters only when clicking the Apply button
  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    setShowFilters(false); 
    setCurrentPage(1); 
  };

  // Reset filters to the default values
  const handleResetFilters = () => {
    resetFilters();
    setAppliedFilters({
      auctionType: '',
      propertyType: '',
      province: '',
      district: '',
    });
  };

  // Fetch data from database
  useEffect(() => {
    fetchLands();
  }, [fetchLands]);

  useEffect(() => {
    let filtered = lands;

    if (searchType === 'auctionType' && value !== 'total') {
      filtered = filtered.filter((card) => card.type.toLowerCase() === value.toLowerCase());
    }
    if (searchType === 'province' && value !== 'total') {
      filtered = filtered.filter((card) => card.province.toLowerCase() === value.toLowerCase());
    }
    if (searchType === 'district' && value !== 'total') {
      filtered = filtered.filter((card) => card.district.toLowerCase() === value.toLowerCase());
    }

    if (appliedFilters.auctionType) {
      filtered = filtered.filter((card) => card.type.toLowerCase() === appliedFilters.auctionType.toLowerCase());
    }
    if (appliedFilters.propertyType) {
      filtered = filtered.filter((card) => card.propertyType.toLowerCase() === appliedFilters.propertyType.toLowerCase());
    }
    if (appliedFilters.province) {
      filtered = filtered.filter((card) => card.province.toLowerCase() === appliedFilters.province.toLowerCase());
    }
    if (appliedFilters.district) {
      filtered = filtered.filter((card) => card.district.toLowerCase() === appliedFilters.district.toLowerCase());
    }

    setFilteredCards(filtered);
    setCountdownTimes(filtered.map((card) => calculateCountdown(card.auctionEnd)));
  }, [lands, searchType, value, appliedFilters]);

  // Pagination logic
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(filteredCards.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="flex-grow container mx-auto p-4 sm:px-10 mt-20">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="flex-grow container mx-auto p-4 sm:px-10 mt-20">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="flex-grow container mx-auto p-4 sm:px-10 mt-20">
        <div className="w-full bg-gray-400 h-[1.5px]"></div>

        {/* Filter Button for Small Screens */}
        <div className="sm:hidden mt-4 flex justify-end">
          <button
            className="flex items-center bg-primary1 text-white px-4 py-2 rounded-lg"
            onClick={() => setShowFilters(!showFilters)}
          >
            <MdFilterList className="mr-2 text-xl" /> Filters
          </button>
        </div>

        {/* Filter Sidebar for Medium and Large Screens */}
        <div className="flex">
          <div className="hidden sm:block sticky top-20 w-64 p-4 border-r border-gray-300 h-screen">
            <FilterSection
              filters={filters}
              handleFilterChange={handleFilterChange}
              applyFilters={applyFilters}
              resetFilters={handleResetFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex-grow p-4">
            {/* Show filters as dropdown on small screens */}
            {showFilters && (
              <div className="sm:hidden bg-white border rounded-lg p-4 mb-4">
                <FilterSection
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                  applyFilters={applyFilters}
                  resetFilters={handleResetFilters}
                />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {currentCards.length > 0 ? (
                currentCards.map((item, index) => (
                  <CardItem
                    key={item._id}
                    item={item}
                    countdownTime={countdownTimes[index]}
                  />
                ))
              ) : (
                <p className="text-center col-span-4">
                  No cards match the selected criteria.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-l-lg"
                >
                  {'<<'}
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 border ${currentPage === index + 1 ? 'bg-yellow-500 text-white' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-r-lg"
                >
                  {'>>'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const FilterSection = ({ filters, handleFilterChange, applyFilters, resetFilters }) => (
  <div className="h-screen sticky top-20 w-64 p-4 border-r border-gray-300">
    {/* Filter Title */}
    <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-300 pb-2">
      Filters
    </h2>
    
    {/* Auction Type Dropdown */}
    <select
      name="auctionType"
      value={filters.auctionType}
      onChange={handleFilterChange}
      className="border p-2 text-sm md:text-base w-full mb-4"
    >
      <option value="">Select Auction Type</option>
      <option value="credit">Credit Auction</option>
      <option value="nba">NBA</option>
      <option value="banking assets">Banking Assets</option>
    </select>

    {/* Property Type Dropdown */}
    <select
      name="propertyType"
      value={filters.propertyType}
      onChange={handleFilterChange}
      className="border p-2 text-sm md:text-base w-full mb-4"
    >
      <option value="">Select Property Type</option>
      <option value="land">Land</option>
      <option value="building">Building</option>
      <option value="land/building">Land/Building</option>
    </select>

    {/* Province Dropdown */}
    <select
      name="province"
      value={filters.province}
      onChange={handleFilterChange}
      className="border p-2 text-sm md:text-base w-full mb-4"
    >
      <option value="">Select Province</option>
      <option value="Koshi">Koshi</option>
      <option value="Madhesh">Madhesh</option>
      <option value="Bagmati">Bagmati</option>
      <option value="Gandaki">Gandaki</option>
      <option value="Lumbini">Lumbini</option>
      <option value="Karnali">Karnali</option>
      <option value="Sudurpaschim">Sudurpaschim</option>
    </select>

    {/* District Dropdown */}
    <select
      name="district"
      value={filters.district}
      onChange={handleFilterChange}
      className="border p-2 text-sm md:text-base w-full mb-4"
    >
      <option value="">Select District</option>
      <option value="Kathmandu">Kathmandu</option>
      <option value="Bhaktapur">Bhaktapur</option>
      <option value="Lalitpur">Lalitpur</option>
      <option value="Pokhara">Pokhara</option>
      <option value="Biratnagar">Biratnagar</option>
      <option value="Janakpur">Janakpur</option>
      <option value="Nepalgunj">Nepalgunj</option>
    </select>

    <div className="mt-4">
      <button
                className="relative  text-white px-2 py-1 overflow-hidden border border-primary1
      transition-colors duration-500 ease-in-out
      hover:bg hover:text-black
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-100 before:origin-left before:transition-transform before:duration-500 before:ease-in-out
      hover:before:scale-x-0 rounded"
                onClick={applyFilters} 
              >
                <span className="relative z-10">Apply</span>
              </button>
              <button
                className="relative  text-white px-2 py-1 overflow-hidden border border-primary1
      transition-colors duration-500 ease-in-out
      hover:bg hover:text-black
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary2 before:transform before:scale-x-100 before:origin-right before:transition-transform before:duration-500 before:ease-in-out
      hover:before:scale-x-0 sm:ml-5 rounded"
                onClick={resetFilters} 
              >
                <span className="relative z-10">Reset</span>
              </button>
    </div>
  </div>
);

export default FilteredCardsPage;
