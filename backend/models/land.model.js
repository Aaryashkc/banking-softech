import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["credit", "nba", "banking assets"],
  },
  area: {
    type: Number,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  auctionStart: {
    type: Date,
    required: true,
  },
  auctionEnd: {
    type: Date,
    required: true,
  },
  landImg: {
    type: [String],
    default: [],
  },
  blueprintImg: {
    type: [String],
    default: [],
  },
  province: {
    type: String,
    required: true,
    enum: ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpaschim"],
  },
  district: {
    type: String,
    required: true,
  },
  propertyType: {
    type: String,
    required: true,
    enum: ["land", "building", "land/building"],
  },
  googleLocation: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Land = mongoose.model("Land", landSchema);

export default Land;
