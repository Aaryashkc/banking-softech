import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";

const CardFilter = ({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  resetFilters,
  activeFilter,
  setActiveFilter,
  applyFilters,
  linkSectionFilter,
  setLinkSectionFilter,
  handleLinkSectionFilter, // Pass the handler
}) => {
  // Create a temporary filter state to hold user selections before applying
  const [tempFilters, setTempFilters] = useState(filters);

  const handleTempFilterChange = (e) => {
    setTempFilters({ ...tempFilters, [e.target.name]: e.target.value });
  };

  const handleFilterByType = (type) => {
    handleLinkSectionFilter(type); // Use the handler passed from Card
    setActiveFilter(type);
  };

  const handleApplyFilters = () => {
    setFilters(tempFilters); // Apply tempFilters to actual filters
    applyFilters(); // Trigger the filtering logic passed in from parent
  };

  const handleResetFilters = () => {
    setTempFilters({
      auctionType: "",
      propertyType: "",
      province: "",
      district: "",
    });
    resetFilters(); // Reset actual filters
  };

  return (
    <>
      {/* Filter buttons */}
      <div></div>
      <div className="sm:px-2 grid grid-cols-[4fr_1fr] sm:gap-60 ">
        <ul className=" flex gap-4 sm:gap-2 md:gap-4 sm:ml-24 justify-start  items-center flex-wrap  ">
          <div className="flex-1 hidden sm:block"></div>

          <li onClick={() => handleFilterByType("all")}>
            <button
              className={`relative text-base px-2 py-[6px] leading-normal tracking-normal cursor-pointer uppercase  flex items-center gap-3 border border-primary1 overflow-hidden
      transition-colors duration-500 ease-in-out
      ${
        linkSectionFilter === "all"
          ? "bg-primary1 text-white"
          : "bg-transparent text-primary1"
      }
      hover:bg-primary1 hover:text-white
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-in-out 
      hover:before:scale-x-100 rounded`}
            >
              <span className="relative z-10">All</span>
            </button>
          </li>

          <li onClick={() => handleFilterByType("credit")}>
            <button
              className={`relative text-base px-2 py-[6px] leading-normal tracking-normal cursor-pointer uppercase  flex items-center gap-3 border border-primary1 overflow-hidden
      transition-colors duration-500 ease-in-out
      ${
        linkSectionFilter === "credit"
          ? "bg-primary1 text-white"
          : "bg-transparent text-primary1"
      }
      hover:bg-primary1 hover:text-white
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-in-out 
      hover:before:scale-x-100 rounded`}
            >
              <span className="relative z-10">Credit</span>
            </button>
          </li>

          <li onClick={() => handleFilterByType("nba")}>
            <button
              className={`relative text-base px-2 py-[6px] leading-normal tracking-normal cursor-pointer uppercase  flex items-center gap-3 border border-primary1 overflow-hidden
      transition-colors duration-500 ease-in-out
      ${
        linkSectionFilter === "nba"
          ? "bg-primary1 text-white"
          : "bg-transparent text-primary1"
      }
      hover:bg-pirmary1 hover:text-white
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-in-out 
      hover:before:scale-x-100 rounded`}
            >
              <span className="relative z-10">NBA</span>
            </button>
          </li>
          <li onClick={() => handleFilterByType("banking")}>
            <button
              className={`relative text-base px-2 py-[6px]  leading-normal tracking-normal cursor-pointer uppercase  flex items-center gap-3 border border-primary1 overflow-hidden
      transition-colors duration-500 ease-in-out
      ${
        linkSectionFilter === "banking"
          ? "bg-primary1 text-white"
          : "bg-transparent text-primary1"
      }
      hover:bg-primary1 hover:text-white
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-in-out 
      hover:before:scale-x-100 rounded`}
            >
              <span className="relative z-10">Banking Assets</span>
            </button>
          </li>
        </ul>
        {/* Filter Toggle */}
        <div
          className={`relative lg:w-24 flex flex-row sm:justify-end h-9 sm:self-end md:self-auto text-base px-2 font-semibold py-1 cursor-pointer border outline-2 border-primary1
    transition-colors duration-500 ease-in-out
    text-primary1
    hover:bg-primary1 hover:text-white
    before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-in-out
    hover:before:scale-x-100 rounded`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <span className="relative z-10 ">Filter</span>
          <span className="text-xl cursor-pointer relative z-10 ">
            <BsFilterRight className=" hover:text-white" />
          </span>
        </div>
      </div>

      <div className=" flex sm:px-10 py-4">
        <div className=" w-full bg-gray-400 h-[1px] mt-3"></div>
      </div>
      {/* Toggleable Filters Section */}
      {showFilters && (
        <div className="px-10">
          <div className="bg-gray-100 p-4 ">
            <div className=" px-8 grid md:grid-cols-4 gap-4">
              {/* Auction Type Dropdown */}
              <select
                name="auctionType"
                value={tempFilters.auctionType}
                onChange={handleTempFilterChange}
                className="border p-2 text-sm md:text-base w-full md:w-auto"
              >
                <option value="">Select Auction Type</option>
                <option value="credit">Credit Auction</option>
                <option value="nba">NBA</option>
                <option value="banking">Banking Assets</option>
              </select>

              {/* Property Type Dropdown */}
              <select
                name="propertyType"
                value={tempFilters.propertyType}
                onChange={handleTempFilterChange}
                className="border p-2 text-sm md:text-base w-full md:w-auto"
              >
                <option value="">Select Property Type</option>
                <option value="land">Land</option>
                <option value="building">Building</option>
                <option value="land/building">land/building</option>
              </select>

              {/* Province Dropdown */}
              <select
                name="province"
                value={tempFilters.province}
                onChange={handleTempFilterChange}
                className="border p-2 text-sm md:text-base w-full md:w-auto"
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
                value={tempFilters.district}
                onChange={handleTempFilterChange}
                className="border p-2 text-sm md:text-base w-full md:w-auto"
              >
                <option value="">Select District</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Bhaktapur">Bhaktapur</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Biratnagar">Biratnagar</option>
                <option value="Dharan">Janakpur</option>
                <option value="Nepalgunj">Nepalgunj</option>
              </select>
            </div>

            {/* Apply and Reset Buttons */}
            <div className="mt-4 px-8">
              <button
                className="relative  text-white px-2 py-1 overflow-hidden border border-primary1
      transition-colors duration-500 ease-in-out
      hover:bg hover:text-black
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-100 before:origin-left before:transition-transform before:duration-500 before:ease-in-out
      hover:before:scale-x-0 rounded"
                onClick={handleApplyFilters} 
              >
                <span className="relative z-10">Apply</span>
              </button>
              <button
                className="relative  text-white px-2 py-1 overflow-hidden border border-primary1
      transition-colors duration-500 ease-in-out
      hover:bg hover:text-black
      before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary2 before:transform before:scale-x-100 before:origin-right before:transition-transform before:duration-500 before:ease-in-out
      hover:before:scale-x-0 sm:ml-5 rounded"
                onClick={handleResetFilters} 
              >
                <span className="relative z-10">Reset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardFilter;
