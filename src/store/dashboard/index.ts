import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import onboardingReducer from './onboardingSlice';
import hotelierReducer from './hotelierSlice';

// ─────────────────────────────────────────────────────────
// Persist only the onboarding slice (you can add more later)
const onboardingPersistConfig = {
  key: 'onboarding',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  onboarding: persistReducer(onboardingPersistConfig, onboardingReducer),
  hotelier: hotelierReducer, // <‑‑ plain slice, not persisted (optional)
});

export const dashboardStore = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(dashboardStore);

// Global (typed) state helpers
export type RootState = ReturnType<typeof dashboardStore.getState>;
export type DashboardDispatch = typeof dashboardStore.dispatch;
