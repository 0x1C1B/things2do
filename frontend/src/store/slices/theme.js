import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      return { ...state, darkMode: !state.darkMode };
    },
    setDarkMode: (state, action) => {
      return { ...state, darkMode: action.payload };
    },
  },
});

export default themeSlice;
