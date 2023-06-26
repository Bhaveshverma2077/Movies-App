import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  appBarLoading: false,
};

const otherSlice = createSlice({
  name: "others",
  initialState: initialState,
  reducers: {
    changeAppBarLoading: (state, action: PayloadAction<boolean>) => {
      state.appBarLoading = action.payload;
      return state;
    },
  },
});

const othersActions = otherSlice.actions;

export { othersActions };

export default otherSlice;
