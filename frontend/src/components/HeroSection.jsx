import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/propertyData';
import { useLandStore } from '../../store/useLandStore';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchType, setSearchType] = useState("auctionType");
  const navigate = useNavigate();
  const { lands, loading, error, fetchLands } = useLandStore();

  const slides = [
    assets.slider1,
    assets.slider2,
    assets.slider3,
    assets.slider4,
  ];

  // Fetch data from database
  useEffect(() => {
    fetchLands();
  }, [fetchLands]);

  const totalItems = lands.length;
  const creditCount = lands.filter(card => card.type.toLowerCase() === 'credit').length;
  const nbaCount = lands.filter(card => card.type.toLowerCase() === 'nba').length;
  const bankingCount = lands.filter(card => card.type.toLowerCase() === 'banking assets').length;

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/cards/${searchType}/${searchValue}`);
    } else {
      alert('Please enter a search term.');
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleAuctionTypeClick = (auctionType) => {
    navigate(`/cards/auctionType/${auctionType.toLowerCase()}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      <div className="grid mx-auto container grid-cols-1 md:grid-cols-2 gap-0 ">
        <div className="flex flex-col justify-center items-center p-8 md:p-16">
          <div className="text-center md:text-start mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">
            <span className='text-[#fbb81a]'>Your Gateway</span> To Deals
            </h1>
            <p className="mt-2 text-lg">
            Discover valuable opportunities with  Siddhartha Bank  Auction Assistance – your trusted destination for exclusive deals and prime assets.  
            </p>
          </div>

          {/* Search Input */}
          <div className="flex w-full mb-4">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="p-2 rounded-l-full border-b-[1px] border-t-[1px] sm:border-b-[1px] border-primary2"
            >
              <option value="auctionType">Auction Type</option>
              <option value="province">Province</option>
              <option value="district">District</option>
            </select>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your search term"
              className="p-2 w-full border-l-[1px] border-t-[1px] border-b-[1px] border-primary2  focus:outline-none"
              required
            />
            <button onClick={handleSearch} className="bg-primary1 text-white p-2 rounded-r-full hover:text-black font-semibold">
              Search
            </button>
          </div>

          {/* Auction Type Buttons */}
          <div className=" hidden sm:flex flex-wrap justify-start  ml-0 items-start sm:gap-4 mt-4">
            <div className="text-center">
              <div className="text-primary1  sm:text-2xl font-semibold">{totalItems}</div>
              <button
                className="  px-4 py-2 rounded-lg hover:text-primary1"
                onClick={() => handleAuctionTypeClick('total')}
              >
                Total
              </button>
            </div>
            <div className="text-center">
              <div className="text-primary1   sm:text-2xl font-bold">{creditCount}</div>
              <button
                className="  px-4 py-2 hover:text-primary1"
                onClick={() => handleAuctionTypeClick('credit')}
              >
                Credit Auction
              </button>
            </div>
            <div className="text-center">
              <div className="text-primary1  sm:text-2xl font-semibold">{nbaCount}</div>
              <button
                className="  px-4 py-2  hover:text-primary1"
                onClick={() => handleAuctionTypeClick('nba')}
              >
                NBA
              </button>
            </div>
            <div className="text-center">
              <div className="text-primary1  sm:text-2xl font-semibold">{bankingCount}</div>
              <button
                className="  px-4 py-2 hover:text-primary1"
                onClick={() => handleAuctionTypeClick('banking assets')}
              >
                Banking Assets
              </button>
            </div>
          </div>
        </div>

        <div className="relative w-full h-48 md:h-auto overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute left-0 top-0 inset-0 h-auto w-full transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              style={{
                backgroundImage: `url(${slide})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
