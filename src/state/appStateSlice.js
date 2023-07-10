import { createSlice } from "@reduxjs/toolkit";

const savedTheme = JSON.parse(localStorage.getItem("calemTheme")) || {
  colorMode: "dark",
  primaryColor: "#E76A3C",
};

const initialState = {
  appState: "",
  isSidebarOpen: true,
  isSettingsOpen: false,
  colorMode: savedTheme.colorMode,
};

export const toggleThemeMode = () => (dispatch) => {
  savedTheme.colorMode = savedTheme.colorMode === "light" ? "dark" : "light";
  localStorage.setItem("calemTheme", JSON.stringify(savedTheme));
  dispatch(changeColorMode(savedTheme.colorMode));
};

export const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
      console.log(state.isSidebarOpen);
    },
    changeColorMode: (state, action) => {
      state.colorMode = action.payload;
    },
  },
});

export const {
  setAppState,
  openSidebar,
  closeSidebar,
  toggleSidebar,
  changeColorMode,
} = appStateSlice.actions;

export default appStateSlice.reducer;
