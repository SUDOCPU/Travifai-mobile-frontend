interface User {
  phone: string;
  role: string;
  token: string;
  otp: string;
}

const mockDB: Record<string, User> = {};

export const addUser = (phone: string, role: string, otp: string) => {
  const token = `token_${phone}`;
  mockDB[phone] = {phone, role, otp, token};
};

export const getUser = (phone: string) => mockDB[phone];

export const verifyOTP = (phone: string, otp: string) => {
  const user = mockDB[phone];
  return user && user.otp === otp;
};

export const getToken = (phone: string) => {
  const user = mockDB[phone];
  return user?.token || null;
};
