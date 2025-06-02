// src/utils/mockAPI.ts

import {addUser, getUser, verifyOTP, getToken} from './mockDB';

export const signup = (phone: string, role: string) => {
  const existing = getUser(phone);
  if (existing) {
    return {success: false, message: 'User already exists'};
  }
  const otp = '1234'; // static OTP
  addUser(phone, role, otp);
  return {success: true, otp};
};

export const login = (phone: string) => {
  const user = getUser(phone);
  if (!user) {
    return {success: false, message: 'User not found'};
  }
  return {success: true, otp: user.otp};
};

export const validateOTP = (phone: string, otp: string) => {
  const valid = verifyOTP(phone, otp);
  if (!valid) return {success: false, message: 'Invalid OTP'};

  const token = getToken(phone);
  return {success: true, token, role: getUser(phone)?.role};
};

// mockAPI.ts
const OTP_STORE: Record<string, string> = {};

export const sendOtp = async (phone: string): Promise<string> => {
  const generatedOtp = '1234'; // You can make it random if needed
  OTP_STORE[phone] = generatedOtp;

  console.log(`[MOCK OTP SENT] Phone: ${phone}, OTP: ${generatedOtp}`);

  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return generatedOtp;
};

export const verifyOtp = async (
  phone: string,
  otp: string,
): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return OTP_STORE[phone] === otp;
};
