import Land from "../models/land.model.js";

// Create new land
export const createLand = async (req, res) => {
  try {
    const newLand = new Land(req.body);
    const savedLand = await newLand.save();
    res.status(201).json({
      success: true,
      data: savedLand
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to create land"
    });
  }
};

// Get all lands with filters and pagination
export const getLands = async (req, res) => {
  try {
    const {
      type,
      propertyType,
      province,
      district,
      status,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc'
    } = req.query;

    // Build filter object - exact match for enums
    const filter = {};
    if (type) filter.type = type;
    if (propertyType) filter.propertyType = propertyType;
    if (province) filter.province = province;
    if (district) filter.district = { $regex: district, $options: 'i' }; 

    // Filter by auction status
    const now = new Date();
    if (status === 'active') {
      filter.auctionStart = { $lte: now };
      filter.auctionEnd = { $gte: now };
    } else if (status === 'upcoming') {
      filter.auctionStart = { $gt: now };
    } else if (status === 'ended') {
      filter.auctionEnd = { $lt: now };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;

    // Execute query
    const lands = await Land.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    // Get total count for pagination
    const total = await Land.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: lands,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lands"
    });
  }
};

// Get single land by ID
export const getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    
    if (!land) {
      return res.status(404).json({
        success: false,
        message: "Land not found"
      });
    }

    // Add computed auction status
    const landData = land.toObject({ virtuals: true });
    
    res.status(200).json({
      success: true,
      data: landData
    });
  } catch (error) {
    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid land ID"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to fetch land"
    });
  }
};

// Update land by ID
export const updateLand = async (req, res) => {
  try {
    const updated = await Land.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Land not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updated
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: Object.values(error.errors).map(e => e.message)
      });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid land ID"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to update land"
    });
  }
};

// Delete land by ID
export const deleteLand = async (req, res) => {
  try {
    const deleted = await Land.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Land not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Land deleted successfully",
      data: deleted
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid land ID"
      });
    }
    res.status(500).json({
      success: false,
      message: "Failed to delete land"
    });
  }
};

// Get active auctions only
export const getActiveAuctions = async (req, res) => {
  try {
    const now = new Date();
    const activeAuctions = await Land.find({
      auctionStart: { $lte: now },
      auctionEnd: { $gte: now }
    }).sort({ auctionEnd: 1 });

    res.status(200).json({
      success: true,
      data: activeAuctions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch active auctions"
    });
  }
};