import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLandStore } from "../../store/useLandStore";
import { format } from "date-fns";
import {
  FaAngleLeft,
  FaAngleRight,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa"; // Import social media icons
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Zoom from "react-medium-image-zoom";
import { assets } from "../assets/propertyData";
import "react-medium-image-zoom/dist/styles.css"; // Import for zoom functionality

const CardDetail = () => {
  const { id } = useParams();
  const { singleLand, loading, error, fetchSingleLand } = useLandStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch single land data
  useEffect(() => {
    if (id) {
      fetchSingleLand(id);
    }
  }, [id, fetchSingleLand]);

  if (loading) {
    return (
      <div>
        <NavBar />
        <div className="container p-4 sm:px-12 pt-15">
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
        <div className="container p-4 sm:px-12 pt-15">
          <div className="text-center text-red-500">Error: {error}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!singleLand) {
    return (
      <div>
        <NavBar />
        <div className="container p-4 sm:px-12 pt-15">
          <div className="text-center">Property not found</div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === singleLand.landImg.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? singleLand.landImg.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <NavBar />
      <div className="container p-4 sm:px-12 pt-15">
        {/* Top Section */}
        <div className="bg-primary3 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-md rounded-lg p-4 mb-6">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold mb-2">
              {singleLand.location}, Plot {singleLand.plot} with an area
              of {singleLand.area} sq.ft.
            </h1>
            <p>
              Auction Start Date:{" "}
              {format(new Date(singleLand.auctionStart), "PPP")}
            </p>
            <p>
              Auction End Date:{" "}
              {format(new Date(singleLand.auctionEnd), "PPP")}
            </p>
            <a
              href={singleLand.googleLocation}
              rel="noopener noreferrer"
              className="text-primary1 font-bold cursor-pointer py-[6px] px-2  border-2 w-[260px] rounded-full border-dotted text-center hover:scale-110 delay-75 ease-in-out duration-150 transform"
            >
              View Location on Google Map
            </a>
          </div>

          {/* Contact Info and Social Links */}
          <div className="mt-4">
            <p>Contact Details for Further Assistance:</p>
            <ul>
              <li>Contact Name 1: 9812345678</li>
              <li>Contact Name 2: 9812345678</li>
            </ul>
          </div>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-blue-600">
              <FaFacebook /> Facebook
            </a>
            <a href="#" className="text-blue-400">
              <FaTwitter /> Twitter
            </a>
            <a href="#" className="text-green-600">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Property Pictures */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold mb-4">Property Pictures</h2>
              <div className="relative group h-96 overflow-hidden mb-4">
                <Zoom>
                  <img
                    src={singleLand.landImg[currentIndex]}
                    className="h-full w-full object-cover"
                    alt="property"
                  />
                </Zoom>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hidden group-hover:block z-20"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hidden group-hover:block z-20"
                >
                  <FaAngleRight />
                </button>
              </div>
              <div className="flex space-x-2">
                {singleLand.landImg.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className={`h-16 w-16 object-cover cursor-pointer ${
                      index === currentIndex ? "border-2 border-red-600" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                    alt={`Thumbnail ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Blueprint / Landmark */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Blueprint / Landmark
              </h3>
              <img
                src={singleLand.blueprintImg[0]}
                alt="Blueprint"
                className="w-full h-auto"
              />
            </div>

            {/* Google Location Embed */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">Google Location</h3>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.710078483527!2d85.33393177405259!3d27.69535422602292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19a77520a339%3A0x4df14616bdef4f1c!2sSoftech%20Foundation%20Pvt.Ltd.!5e0!3m2!1sen!2snp!4v1725950146568!5m2!1sen!2snp"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen="" // Correct this prop
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" // Correct this prop
              ></iframe>
              <a
                href={singleLand.googleLocation}
                rel="noopener noreferrer"
                className="text-primary1 underline block mt-2 cursor-pointer"
              >
                Click here to view location on Google Map
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 sticky top-24">
            <div className="sticky top-24">
              <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Scan to Get Our Website URL
                </h3>
                <img src={assets.qr} alt="QR Code" className="w-full h-auto" />
              </div>
              <div className="bg-white shadow-md rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">
                  Request Your Enquiry Here
                </h3>
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border rounded"
                      placeholder="Your Email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Your Mobile Number"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Your Address</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Your Address"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Message</label>
                    <textarea
                      className="w-full p-2 border rounded"
                      placeholder="Your Message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-primary1 text-white p-2 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CardDetail;

