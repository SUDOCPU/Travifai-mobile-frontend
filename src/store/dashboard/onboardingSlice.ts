// src/store/dashboard/onboardingSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Tile = 'personal' | 'hotel' | 'room' | 'nearby' | 'security' | 'amenities';

interface OnboardingState {
  completed: Record<Tile, boolean>;
  data: Record<Tile, any>; // plain JSON only
}

const initialState: OnboardingState = {
  completed: {
    personal: false,
    hotel: false,
    room: false,
    nearby: false,
    security: false,
    amenities: false,
  },
  data: {},
};

const slice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    saveTile(
      state,
      action: PayloadAction<{tile: Tile; payload: Record<string, any>}>,
    ) {
      const {tile, payload} = action.payload;
      state.completed[tile] = true;
      state.data[tile] = payload; // plain JSON only
    },
    resetOnboarding() {
      return initialState;
    },
  },
});

export const {saveTile, resetOnboarding} = slice.actions;

export default persistReducer(
  {key: 'onboarding', storage: AsyncStorage},
  slice.reducer,
);
