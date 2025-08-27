import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";

const CardItem = ({ item, countdownTime }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/card-details/${item._id}`);
  };

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === item.landImg.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? item.landImg.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative bg-white shadow-md rounded-lg overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Image Slider */}
      <div className="relative group h-56 overflow-hidden">
        <img
          src={item.landImg[currentIndex]}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          alt="property"
        />
        {/* Countdown Timer at the base of the image slider */}

        {/* Dots Indicator */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
          {item.landImg.map((_, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePrevImage();
              }}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? "bg-[#fbb81a]" : "bg-white"
              }`}
            />
          ))}
        </div>

        {/* Previous and Next Arrows */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePrevImage();
          }}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-primary1 text-white p-2 rounded-full shadow hidden group-hover:block z-20"
        >
          <FaAngleLeft />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNextImage();
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary1 text-white p-2 rounded-full shadow hidden group-hover:block z-20"
        >
          <FaAngleRight />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div className="mt-6">
          {/* Countdown */}
          <div className="absolute top-[44%] left-0 w-full bg-[#fbb81a] rounded-b-3xl font-bold text-white text-center py-2">
            {countdownTime}
          </div>
          <h2 className="font-bold text-primary2 text-lg mb-2">
            Area: <span className="text-primary1">{item.area} sq.ft.</span>
          </h2>
          <p className="text-primary2 text-lg mb-2 font-semibold">
            Plot: <span className="text-primary1">{item.plot}</span>{" "}
          </p>
          <p className="text-primary2 text-md mb-4 font-semibold">
            Location:{" "}
            <span className="font-bold text-primary1">{item.location}</span>
          </p>
        </div>

        {/* Auction Start and End Time */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <IoTimeOutline className="mr-2 text-primary1" />
            <p className="text-primary2 font-semibold">
              Auction Start:{" "}
              <span className="font-bold text-primary2">
                {new Date(item.auctionStart).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <IoTimeOutline className="mr-2 text-primary1 " />
            <p className="text-primary2 font-semibold">
              Auction End:{" "}
              <span className="font-bold text-primary2">
                {new Date(item.auctionEnd).toLocaleDateString()}
              </span>
            </p>
          </div>
        </div>

        {/* Property Type Tag */}
        <div className="text-white text-center px-2 rounded-lg py-1 bg-[#fbb81a] absolute top-2 left-2 font-semibold">
          {item.propertyType}
        </div>

        {/* View Detail Button */}
        <button
          className="relative text-base px-4 py-2 font-bold rounded-lg overflow-hidden
    border border-primary1
    transition-colors duration-500 ease-in-out
    bg-transparent text-primary1
    hover:bg-primary1 hover:text-white
    before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-primary1 before:transform before:scale-x-0 before:origin-left before:transition-transform before:duration-500 before:ease-in-out before:rounded-lg
    hover:before:scale-x-100 self-end"
          onClick={handleCardClick}
        >
          <span className="relative z-10">View Detail</span>
        </button>
      </div>
    </div>
  );
};

export default CardItem;
