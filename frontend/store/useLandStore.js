import { create } from "zustand";
import { axiosInstance } from "../src/libs/axios.js";

export const useLandStore = create((set, get) => ({
  lands: [],
  singleLand: null,
  loading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    pages: 0,
  },

  filters: {
    type: "", 
    propertyType: "",
    province: "",
    district: "",
    status: "", 
    sortBy: "createdAt",
    order: "desc",
  },

  // Set single filter field
  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  // Set entire filter object
  setFilters: (newFilters) => set({ filters: newFilters }),

  // Set page for pagination
  setPage: (page) =>
    set((state) => ({
      pagination: { ...state.pagination, page },
    })),

  // Clear error
  clearError: () => set({ error: null }),

  // Reset filters
  resetFilters: async () => {
    set({
      filters: {
        type: "",
        propertyType: "",
        province: "",
        district: "",
        status: "",
        sortBy: "createdAt",
        order: "desc",
      },
      pagination: { ...get().pagination, page: 1 },
    });
    await get().fetchLands();
  },

  // Fetch all lands based on filters
  fetchLands: async () => {
    set({ loading: true, error: null });
    const { filters, pagination } = get();

    const params = {
      page: pagination.page,
      limit: pagination.limit,
      sortBy: filters.sortBy,
      order: filters.order,
    };

    if (filters.type) params.type = filters.type;
    if (filters.propertyType) params.propertyType = filters.propertyType;
    if (filters.province) params.province = filters.province;
    if (filters.district) params.district = filters.district;
    if (filters.status) params.status = filters.status;

    try {
      const res = await axiosInstance.get("/lands", { params });
      
      if (res.data.success) {
        set({
          lands: res.data.data,
          pagination: res.data.pagination,
        });
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch lands";
      set({ error: errorMessage, lands: [] });
    } finally {
      set({ loading: false });
    }
  },

  // Fetch a single land
  fetchSingleLand: async (id) => {
    set({ loading: true, error: null, singleLand: null });
    try {
      const res = await axiosInstance.get(`/lands/${id}`);
      
      if (res.data.success) {
        set({ singleLand: res.data.data });
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch land";
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },

  // Create a new land
  createLand: async (landData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.post("/lands", landData);
      
      if (res.data.success) {
        // Optimistically add to list if on first page
        const { pagination, lands } = get();
        if (pagination.page === 1) {
          set((state) => ({
            lands: [res.data.data, ...state.lands].slice(0, pagination.limit),
          }));
        }
        return res.data.data;
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0] || "Failed to create land";
      set({ error: errorMessage });
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
      
      if (res.data.success) {
        // Optimistically update in list
        set((state) => ({
          lands: state.lands.map((land) =>
            land._id === id ? res.data.data : land
          ),
          singleLand: state.singleLand?._id === id ? res.data.data : state.singleLand,
        }));
        return res.data.data;
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0] || "Failed to update land";
      set({ error: errorMessage });
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
      
      if (res.data.success) {
        // Optimistically remove from list
        set((state) => ({
          lands: state.lands.filter((land) => land._id !== id),
        }));
        return res.data.data;
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to delete land";
      set({ error: errorMessage });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Fetch active auctions only
  fetchActiveAuctions: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/lands/active");
      
      if (res.data.success) {
        set({ lands: res.data.data });
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to fetch active auctions";
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
}));