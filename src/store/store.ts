import { configureStore, createSlice } from '@reduxjs/toolkit'

const DARK_MODE_KEY = "DARK_MODE_KEY"

const darkModeInit = () => {
  let item
  if ((item = localStorage.getItem(DARK_MODE_KEY))) {
    return JSON.parse(item);
  }
  const hour = (new Date()).getHours();
  return hour < 9 || hour > 12 + 6;
}
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    on: darkModeInit(),
  },
  reducers: {
    toggle: (state) => {
      state.on = !state.on;
      localStorage.setItem(DARK_MODE_KEY, JSON.stringify(state.on));
    }
  }
})

export const { toggle } = darkModeSlice.actions;

export default configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
  },
})