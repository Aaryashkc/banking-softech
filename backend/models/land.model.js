import mongoose from "mongoose";

const landSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["credit", "nba", "banking assets"],
    index: true,
  },
  area: {
    type: Number,
    required: true,
    min: [0, "Area must be positive"],
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
    index: true,
  },
  auctionEnd: {
    type: Date,
    required: true,
    index: true,
  },
  landImg: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.every(url => /^https?:\/\/.+/.test(url));
      },
      message: "Invalid image URL format"
    }
  },
  blueprintImg: {
    type: [String],
    default: [],
    validate: {
      validator: function(v) {
        return v.every(url => /^https?:\/\/.+/.test(url));
      },
      message: "Invalid blueprint URL format"
    }
  },
  province: {
    type: String,
    required: true,
    enum: ["Koshi", "Madhesh", "Bagmati", "Gandaki", "Lumbini", "Karnali", "Sudurpaschim"],
    index: true,
  },
  district: {
    type: String,
    required: true,
    index: true,
  },
  propertyType: {
    type: String,
    required: true,
    enum: ["land", "building", "land/building"],
    index: true,
  },
  googleLocation: {
    type: String,
    required: true,
  },
  startingBid: {
    type: Number,
    min: [0, "Starting bid must be positive"],
  },
  currentBid: {
    type: Number,
    min: [0, "Current bid must be positive"],
  },
  status: {
    type: String,
    enum: ["upcoming", "active", "ended"],
    default: "upcoming",
  }
}, {
  timestamps: true
});

landSchema.pre('save', function(next) {
  if (this.auctionEnd <= this.auctionStart) {
    next(new Error('Auction end date must be after start date'));
  }
  next();
});

landSchema.virtual('auctionStatus').get(function() {
  const now = new Date();
  if (now < this.auctionStart) return 'upcoming';
  if (now > this.auctionEnd) return 'ended';
  return 'active';
});

landSchema.index({ province: 1, district: 1, propertyType: 1 });
landSchema.index({ auctionStart: 1, auctionEnd: 1 });

const Land = mongoose.model("Land", landSchema);

export default Land;