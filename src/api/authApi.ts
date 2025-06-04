import api from './axiosConfig';

export const signup = (
  email: string,
  phone: string,
  username: string,
  password: string,
) => api.post('/auth/signup', {email, phone, username, password});

export const login = (email: string, password: string) =>
  api.post('/auth/login', {email, password});

export const forgotPassword = (email: string) =>
  api.post('/auth/forgot-password', {email});

export const resetPassword = (
  email: string,
  otp: string,
  newPassword: string,
) => api.post('/auth/reset-password', {email, otp, newPassword});
