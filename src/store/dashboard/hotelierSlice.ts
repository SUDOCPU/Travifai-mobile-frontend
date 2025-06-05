// src/store/dashboard/hotelierSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type PersonalInfo = {fullName: string; phone: string};
export type HotelInfo = {hotelName: string; address: string};
export type RoomInfo = {type: string; price: string};

interface HotelierState {
  personal: PersonalInfo;
  hotel: HotelInfo;
  room: RoomInfo;
  completed: boolean;
}

const initialState: HotelierState = {
  personal: {fullName: '', phone: ''},
  hotel: {hotelName: '', address: ''},
  room: {type: '', price: ''},
  completed: false,
};

const hotelierSlice = createSlice({
  name: 'hotelier',
  initialState,
  reducers: {
    savePersonal(state, action: PayloadAction<PersonalInfo>) {
      state.personal = action.payload;
    },
    saveHotel(state, action: PayloadAction<HotelInfo>) {
      state.hotel = action.payload;
    },
    saveRoom(state, action: PayloadAction<RoomInfo>) {
      state.room = action.payload;
    },
    markCompleted(state) {
      state.completed = true;
    },
    resetProfile() {
      return initialState;
    },
  },
});

export const {savePersonal, saveHotel, saveRoom, markCompleted, resetProfile} =
  hotelierSlice.actions;
export default hotelierSlice.reducer;
