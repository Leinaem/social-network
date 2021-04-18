import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserProfileState {
  profilModalOpen: Boolean;
  profileModalReadOnly: Boolean;
  profileEdited: Boolean;
  tempProfileImageData: null | string;
  profileImageError: string | false;
}

const initialState: UserProfileState = {
  profilModalOpen: false,
  profileModalReadOnly: true,
  profileEdited: false,
  tempProfileImageData: null,
  profileImageError: false,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setProfilModalOpen(state, action: PayloadAction<Boolean>) {
      state.profilModalOpen = action.payload;
    },
    setUserProfileModalReadOnly(state, action: PayloadAction<Boolean>) {
      state.profileModalReadOnly = action.payload;
    },
    setUserProfileEdited(state, action: PayloadAction<Boolean>) {
      state.profileEdited = action.payload;
    },
    setUserProfileImageData(state, action: PayloadAction<null | string>) {
      state.tempProfileImageData = action.payload;
    },
    setUserProfileImageError(state, action: PayloadAction<string | false>) {
      state.profileImageError = action.payload;
    },
  },
});

export const {
  setProfilModalOpen,
  setUserProfileModalReadOnly,
  setUserProfileEdited,
  setUserProfileImageData,
  setUserProfileImageError,
} = userProfileSlice.actions;
export const userProfileSelector = (state: { userProfile: UserProfileState }) =>
  state.userProfile;
export default userProfileSlice.reducer;
