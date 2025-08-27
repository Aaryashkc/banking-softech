import Land from "../models/land.model.js";

// Create new land
export const createLand = async (req, res) => {
  try {
    const newLand = new Land(req.body);
    const savedLand = await newLand.save();
    res.status(201).json(savedLand);
  } catch (error) {
    res.status(500).json({ message: "Failed to create land", error });
  }
};

// Get all lands with optional filters
export const getLands = async (req, res) => {
  try {
    const { type, propertyType, province, district } = req.query;

    const filter = {};

    if (type) filter.type = { $regex: type, $options: 'i' };
    if (propertyType) filter.propertyType = { $regex: propertyType, $options: 'i' };
    if (province) filter.province = { $regex: province, $options: 'i' };
    if (district) filter.district = { $regex: district, $options: 'i' };

    const lands = await Land.find(filter).sort({ createdAt: -1 });
    res.status(200).json(lands);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch lands", error });
  }
};

// Get single land by ID
export const getLandById = async (req, res) => {
  try {
    const land = await Land.findById(req.params.id);
    if (!land) return res.status(404).json({ message: "Land not found" });
    res.status(200).json(land);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch land", error });
  }
};

// Update land by ID
export const updateLand = async (req, res) => {
  try {
    const updated = await Land.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "Land not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update land", error });
  }
};

// Delete land by ID
export const deleteLand = async (req, res) => {
  try {
    const deleted = await Land.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Land not found" });
    res.status(200).json({ message: "Land deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete land", error });
  }
};
