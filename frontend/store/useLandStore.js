import { create } from "zustand";
import { axiosInstance } from "../src/libs/axios.js";

export const useLandStore = create((set, get) => ({
  lands: [],
  singleLand: null,
  loading: false,
  error: null,

  // Filters
  filters: {
    auctionType: "",
    propertyType: "",
    province: "",
    district: "",
  },

  // Set single filter field
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  // Set entire filter object
  setFilters: (newFilters) => set({ filters: newFilters }),

  // Reset filters
  resetFilters: async () => {
    set({
      filters: {
        auctionType: "",
        propertyType: "",
        province: "",
        district: "",
      },
    });
    await get().fetchLands(); 
  },

  // Fetch all lands based on filters
  fetchLands: async () => {
    set({ loading: true, error: null });
    const { filters } = get();

    const params = {};
    if (filters.auctionType) params.type = filters.auctionType;
    if (filters.propertyType) params.propertyType = filters.propertyType;
    if (filters.province) params.province = filters.province;
    if (filters.district) params.district = filters.district;

    try {
      const res = await axiosInstance.get("/lands", { params });
      set({ lands: res.data });
    } catch (err) {
      set({ error: err.response?.data || "Failed to fetch lands" });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single land
  fetchSingleLand: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(`/lands/${id}`);
      set({ singleLand: res.data });
    } catch (err) {
      set({ error: err.response?.data || "Failed to fetch land" });
    } finally {
      set({ loading: false });
    }
  },

  // Create a new land
  createLand: async (landData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/lands", landData);
      await get().fetchLands(); // refresh
      return res.data;
    } catch (err) {
      set({ error: err.response?.data || "Failed to create land" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Update land by ID
  updateLand: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put(`/lands/${id}`, updatedData);
      await get().fetchLands();
      return res.data;
    } catch (err) {
      set({ error: err.response?.data || "Failed to update land" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Delete land by ID
  deleteLand: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.delete(`/lands/${id}`);
      await get().fetchLands();
      return res.data;
    } catch (err) {
      set({ error: err.response?.data || "Failed to delete land" });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));

