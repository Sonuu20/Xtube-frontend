import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "@/helpers/axios.helper.js";
import { toast } from "react-toastify";

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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //login
    builder.addCase(Login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
    });
    builder.addCase(Login.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    //logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.status = false;
    });

    //getCurrentUser
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.status = true;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.loading = false;
      state.userData = null;
      state.status = false;
    });

    //for changing password
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
    });

    //Refresh accessToken
    builder.addCase(refreshAccessToken.pending, (state) => {
      state.loading = false;
    });
    builder.addCase(refreshAccessToken.rejected, (state) => {
      state.loading = false;
    });

    //updating profile
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateUserDetails.rejected, (state) => {
      state.loading = false;
    });

    //for updating avatar
    builder.addCase(updateAvatar.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateAvatar.rejected, (state) => {
      state.loading = false;
    });

    //update coverImage
    builder.addCase(updateCoverImg.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCoverImg.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    });
    builder.addCase(updateCoverImg.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
