export const isValidGmail = (email: string): boolean => {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
};
