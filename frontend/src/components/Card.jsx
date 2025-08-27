import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLandStore } from "../../store/useLandStore";
import CardFilter from "./CardFilter";
import CardItem from "./CardItem";
import { calculateCountdown } from "../assets/helper";

const Card = () => {
  const { lands, loading, error, fetchLands, filters, setFilters, resetFilters } = useLandStore();
  const [filteredCards, setFilteredCards] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [linkSectionFilter, setLinkSectionFilter] = useState("all");
  const [countdownTimes, setCountdownTimes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const navigate = useNavigate(); // Hook to handle navigation

  // Fetch data from database
  useEffect(() => {
    fetchLands();
  }, [fetchLands]);

  // Update countdown times every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdownTimes(
        filteredCards.map((card) => calculateCountdown(card.auctionEnd))
      );
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [filteredCards]);

  // Apply filters to data
  const applyFilters = () => {
    let filtered = lands;

    if (linkSectionFilter && linkSectionFilter !== "all") {
      filtered = filtered.filter(
        (card) => card.type.toLowerCase() === linkSectionFilter.toLowerCase()
      );
    }

    if (filters.auctionType && filters.auctionType !== "all") {
      filtered = filtered.filter(
        (card) => card.type.toLowerCase() === filters.auctionType.toLowerCase()
      );
    }
    if (filters.propertyType) {
      filtered = filtered.filter(
        (card) =>
          card.propertyType.toLowerCase() === filters.propertyType.toLowerCase()
      );
    }
    if (filters.province) {
      filtered = filtered.filter(
        (card) => card.province.toLowerCase() === filters.province.toLowerCase()
      );
    }
    if (filters.district) {
      filtered = filtered.filter(
        (card) => card.district.toLowerCase() === filters.district.toLowerCase()
      );
    }

    setFilteredCards(filtered);
    setVisibleCount(8); // Reset visible cards count after filtering
  };

  // Reset filters
  const handleResetFilters = () => {
    resetFilters();
    setLinkSectionFilter("all"); // Reset link section filter
    setVisibleCount(8); // Reset visible cards count after reset
  };

  const handleLinkSectionFilter = (type) => {
    setLinkSectionFilter(type);
  };

  const handleAuctionTypeClick = (auctionType) => {
    navigate(`/cards/auctionType/${auctionType.toLowerCase()}`);
  };

  useEffect(() => {
    applyFilters();
  }, [lands, filters, linkSectionFilter]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:px-10 mt-20">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:px-10 mt-20">
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:px-10 mt-20">
    
      <CardFilter
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        resetFilters={handleResetFilters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        applyFilters={applyFilters}
        linkSectionFilter={linkSectionFilter}
        setLinkSectionFilter={setLinkSectionFilter}
        handleLinkSectionFilter={handleLinkSectionFilter}
      />

      {/* Card List */}
      <div className="grid grid-cols-1 px-10 sm:grid-cols-2 md:grid-cols-4 gap-6 py-3">
        {filteredCards.slice(0, visibleCount).map((item, index) => (
          <CardItem
            key={item._id}
            item={item}
            countdownTime={countdownTimes[index]}
          />
        ))}
      </div>

      {/* View More Button */} 
      {visibleCount < filteredCards.length && (
        <div className="text-center">
          <button
           onClick={() => handleAuctionTypeClick('total')}
            className="    relative px-2 mt-4 py-[6px] overflow-hidden border border-primary1 transition-colors duration-500 ease-in-out  text-white  hover:text-primary1 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform  before:scale-x-100 before:origin-right before:transition-transform before:duration-500 before:ease-in-out  hover:before:scale-x-0 rounded-lg"

          >
            <span className="relative z-10">
            View More
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;