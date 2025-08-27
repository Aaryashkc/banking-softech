import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Land from './models/land.model.js';

dotenv.config();

const sampleLands = [
  {
    type: "credit",
    area: 1200,
    plot: "Plot A",
    location: "Kathmandu",
    auctionStart: new Date("2024-09-10T12:00:00Z"),
    auctionEnd: new Date("2024-09-15T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Bagmati",
    district: "Kathmandu",
    propertyType: "land",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  },
  {
    type: "nba",
    area: 1500,
    plot: "Plot B",
    location: "Janakpur",
    auctionStart: new Date("2024-09-12T12:00:00Z"),
    auctionEnd: new Date("2024-09-20T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Madhesh",
    district: "Janakpur",
    propertyType: "building",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  },
  {
    type: "nba",
    area: 2000,
    plot: "Plot C",
    location: "Pokhara",
    auctionStart: new Date("2024-09-15T12:00:00Z"),
    auctionEnd: new Date("2024-09-25T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Gandaki",
    district: "Pokhara",
    propertyType: "land/building",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  },
  {
    type: "banking assets",
    area: 1800,
    plot: "Plot D",
    location: "Biratnagar",
    auctionStart: new Date("2024-09-18T12:00:00Z"),
    auctionEnd: new Date("2024-09-28T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Koshi",
    district: "Biratnagar",
    propertyType: "building",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  },
  {
    type: "credit",
    area: 2200,
    plot: "Plot E",
    location: "Bhaktapur",
    auctionStart: new Date("2024-09-20T12:00:00Z"),
    auctionEnd: new Date("2024-09-30T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Bagmati",
    district: "Bhaktapur",
    propertyType: "land",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  },
  {
    type: "nba",
    area: 1600,
    plot: "Plot F",
    location: "Lalitpur",
    auctionStart: new Date("2024-09-22T12:00:00Z"),
    auctionEnd: new Date("2024-10-02T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Bagmati",
    district: "Lalitpur",
    propertyType: "building",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  },
  {
    type: "banking assets",
    area: 1900,
    plot: "Plot G",
    location: "Nepalgunj",
    auctionStart: new Date("2024-09-25T12:00:00Z"),
    auctionEnd: new Date("2024-10-05T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Lumbini",
    district: "Nepalgunj",
    propertyType: "land/building",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  },
  {
    type: "credit",
    area: 1400,
    plot: "Plot H",
    location: "Surkhet",
    auctionStart: new Date("2024-09-28T12:00:00Z"),
    auctionEnd: new Date("2024-10-08T12:00:00Z"),
    landImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    blueprintImg: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500"
    ],
    province: "Karnali",
    district: "Surkhet",
    propertyType: "land",
    googleLocation: "https://maps.app.goo.gl/5YyG6QovKq1bFEEf7"
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Land.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    const insertedLands = await Land.insertMany(sampleLands);
    console.log(`Inserted ${insertedLands.length} lands`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
