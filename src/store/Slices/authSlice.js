import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "@/helpers/axios.helper.js";
import { toast } from "react-toastify";
import { data } from "autoprefixer";

const API_URL = "https://xtube-backend-wuhs.onrender.com/api/v1";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
};

//register
export const register = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      formData.append("avatar", data.avatar[0]);
      if (data.coverImage) {
        formData.append("coverImage", data.coverImage[0]);
      }
      const response = await axiosInstance.post("/users/register", formData);
      toast.success("Account created successfully 😄");
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

//Login
export const Login = createAsyncThunk(
  "auth/Login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/login", data);
      toast.success(response.data.message + "🤩");
      return response.data.user;
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

//logout
export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const response = await axiosInstance.post("/users/logout");
    toast.success("Logged out successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response?.data?.message);
    console.log(error);
    throw error;
  }
});

//get-current-user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    try {
      const response = await axiosInstance.get("/users/current-user");
    } catch (error) {
      toast.error(error.response?.data);
      console.log(error);
      throw error;
    }
  }
);

//change passowrd
export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        "/users/change-password",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);

//refresh access token
export const refreshAccessToken = createAsyncThunk(
  "auth/refresh-token",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users/refresh-token");
      console.log("Refesh token response::", response);
      return response.data;
    } catch (error) {
      console.error("Refresh token error:: ", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

//update user details
export const updateUserDetails = createAsyncThunk(
  "user/update-details",
  async (data) => {
    try {
      const response = await axiosInstance.patch(
        "/users/update-details",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(
        response.data.message || "Account details updated successfully!"
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  }
);

//update cover Image
export const updateCoverImg = createAsyncThunk(
  "user/coverImage",
  async (coverImg) => {
    try {
      const response = await axiosInstance.patch(
        "/users/update-cover-image",
        coverImg,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      return response.data.message;
    } catch (error) {
      toast.error(error.response?.data.error);
      console.log(error);
      throw error;
    }
  }
);

//update avatar
export const updateAvatar = createAsyncThunk("user/Avatar", async (avatar) => {
  try {
    const response = await axiosInstance.patch("users/update-avatar", avatar, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Avatar updated successfully!");
  } catch (error) {
    toast.error(response.data?.message?.error);
    console.log(error);
    throw error;
  }
});
